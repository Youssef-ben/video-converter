import { Router, Response, Request } from 'express';
import ServerController from '../controllers/server.controller';
import BaseRoutesConfig from './base.routes.config';

class ServerRoutes extends BaseRoutesConfig {
  constructor() {
    super(ServerController.name);
  }

  protected configureRoutes(): Router {
    this.router.get('/', async (_: Request, res: Response) => {
      const response = await ServerController.getConfig();
      return res.send(response);
    });

    return this.router;
  }
}

export default new ServerRoutes();
