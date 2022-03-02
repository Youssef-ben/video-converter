// Load the .env file and configure it
import dotenv from 'dotenv';
dotenv.config();

// Framework Imports
import express from 'express';
require('express-async-errors'); // Required to handle errors for the async routes/methods.
import cors from 'cors';
import helmet from 'helmet';
import { Server as HttpServer, createServer } from 'http';
import { Server as WsServer } from 'socket.io';
import { json } from 'body-parser';
import compression from 'compression';
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express';
import fs from 'fs';

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const xss = require('xss-clean');

// Custom Imports
import { appConfig } from './config';
import { logger } from './utils/winston.logger';
import BaseRoutesConfig from './routes/base.routes.config';
import ApiRegisterRoutes from './routes';
import { globalErrorsHandlerMiddleware } from './middlewares/errors.middleware';
import jsonFormatterMiddleware from './middlewares/json.formatter.middleware';
import { SERVER_TEMP_FOLDER } from './utils/constants';
import { handleWebSocketConnection } from './websocket';
import { validateWebSocketAccessToken } from './websocket/downloader.events';
import rateLimit from 'express-rate-limit';

// Init the base configuration
const app: express.Application = express();
const httpServer: HttpServer = createServer(app);
const routes: Array<BaseRoutesConfig> = [];
const wsServer = new WsServer(httpServer, {
  path: '/vytc',
  cors: {
    origin: appConfig.allowed_guests.split(';'),
  },
});

// Apply filter and middleware.
app.use(json());
app.use(xss());
app.use(
  cors({
    origin: appConfig.allowed_guests.split(';'),
  })
);

app.use(helmet());
app.disable('x-powered-by');
app.use(express.static('public'));
app.use(compression());

app.use(jsonFormatterMiddleware.requestRemoveEmptyProperties());
app.use(jsonFormatterMiddleware.requestToCamelCaseMiddleware());
app.use(jsonFormatterMiddleware.responseToSnakeCaseMiddleware());

// Create the rate limit rule
const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // limit each IP to 50 requests per windowMs
});

// Use the limit rule as an application middleware
app.use(apiRequestLimiter);

// Configure Swagger.
if (appConfig.app.environment === 'development') {
  const swaggerUiOptions: SwaggerUiOptions = {
    explorer: false,
    swaggerUrl: '/swagger.json',
  };

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(undefined, swaggerUiOptions));
}

// Register the API routes.
const apiRoutes = new ApiRegisterRoutes();
app.use(apiRoutes.configureRoutes());

// Middleware handler after routes.
app.use(globalErrorsHandlerMiddleware);

/**
 * Defines the actions to be executed in order to start the Express Server.
 *
 * Using this method allows to configure other tools
 * like mongodb that requires an async action
 * at the startup level.
 */
const start_server = async (): Promise<HttpServer> => {
  if (fs.existsSync(SERVER_TEMP_FOLDER)) {
    fs.rmSync(SERVER_TEMP_FOLDER, { recursive: true });
  }

  fs.mkdir(SERVER_TEMP_FOLDER, { recursive: true }, (err: NodeJS.ErrnoException | null, _?: string) => {
    if (err) {
      logger.error(`An error occurred while creating the temporary - [${err.message}]!`);
    }
  });

  logger.debug(`Temporary folder created => (${SERVER_TEMP_FOLDER})`);

  const API_PORT = appConfig.app.port;

  wsServer.use(function (socket, next) {
    validateWebSocketAccessToken(socket);
    next();
  });

  wsServer.on('connect', handleWebSocketConnection);

  httpServer.listen(API_PORT, () => {
    logger.info(`Server up and running at http://localhost:${API_PORT} with version {${appConfig.app.version}}`);

    // show available routes
    routes.forEach((route: BaseRoutesConfig) => {
      logger.debug(`Routes configured for controller : {${route.getName()}}`);
    });
  });

  return httpServer;
};

start_server();

/**
 * Close the server gracefully and all other tools.
 */
function gracefulClosing() {
  logger.info(`Shutting down the server and all connected tools...`);
  fs.rmdirSync(SERVER_TEMP_FOLDER, { recursive: true });

  wsServer.close((err: Error | undefined) => {
    // eslint-disable-next-line no-console
    if (err) console.log(err);
    else {
      logger.info('Closed the websocket server!');
    }

    httpServer.close(() => {
      logger.info(`Server shutdown.`);

      // close db connections here or do any clean-up if required.
      logger.info(`Exiting the node process...`);
      process.exit(0); // if required
    });
  });
}

// Listen for process termination.
process.on('SIGINT', gracefulClosing);
process.on('SIGTERM', gracefulClosing);

export default httpServer;
