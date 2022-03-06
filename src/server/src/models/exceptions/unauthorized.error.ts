import { logger } from '../../utils/winston.logger';
import { BaseCustomError, ErrorDetails } from './base.error';

export class UnAuthorizedError extends BaseCustomError {
  statusCode = 401;
  error_type = 'api.err.security.unauthorized';

  constructor() {
    super('UnAuthorized, the supplied token is expired or invalid!');

    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
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
