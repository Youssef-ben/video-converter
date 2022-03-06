import { Router } from 'express';
import { logger } from '../utils/winston.logger';

/**
 * Use this class as base to register routes
 * for a given controller.
 */
export default abstract class BaseRoutesConfig {
  protected readonly router: Router;
  protected readonly name: string;
  protected readonly baseRoute: string;

  constructor(name: string) {
    this.router = Router();
    this.name = name.toLowerCase();
    this.baseRoute = `/${this.name}`;

    // Calling the Configure route at initialization.
    this.configureRoutes();
    logger.debug(`Routes configured for controller : {${this.name}}`);
  }

  /**
   * Used to register the router  for a given controller.
   */
  protected abstract configureRoutes(): Router;

  getRouter(): Router {
    return this.router;
  }

  getRoute(): string {
    return this.baseRoute;
  }

  getName(): string {
    return this.name;
  }
}
