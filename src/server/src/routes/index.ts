import { Router } from 'express';
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
    return this.router;
  }
}
