import { Router, Request, Response } from 'express';
import { RouteNotFoundError } from '../models/exceptions/route_not_found.errors';
import ServerRoutes from './server.routes';
import WorkerRoutes from './worker.routes';
import DownloaderRoutes from './downloader.routes';
import SecurityRoutes from '../routes/security.routes';

/**
 * Register all the routes of the API.
 */
export default class ApiRegisterRoutes {
  protected readonly router: Router;

  constructor() {
    this.router = Router();
  }

  configureRoutes(): Router {
    this.router.use(ServerRoutes.getRoute(), ServerRoutes.getRouter());
    this.router.use(WorkerRoutes.getRoute(), WorkerRoutes.getRouter());
    this.router.use(DownloaderRoutes.getRoute(), DownloaderRoutes.getRouter());
    this.router.use(SecurityRoutes.getRoute(), SecurityRoutes.getRouter());

    // Config a {404: Route Not Found} custom error for bad urls.
    this.router.use('*', (req: Request, res: Response) => {
      throw new RouteNotFoundError();
    });

    return this.router;
  }
}
