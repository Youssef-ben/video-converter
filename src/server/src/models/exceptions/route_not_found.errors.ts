import { logger } from '../../utils/winston.logger';
import { BaseCustomError, ErrorDetails } from './base.error';

export class RouteNotFoundError extends BaseCustomError {
  statusCode = 404;
  error_type = 'api.err.not_found';

  constructor() {
    super("Couldn't find the requested resource, please verify the url and try again!");

    this.message = "Couldn't find the requested resource, please verify the url and try again!";

    Object.setPrototypeOf(this, RouteNotFoundError.prototype);
    logger.error(this.toJson());
  }

  serializeErrors(): ErrorDetails[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
