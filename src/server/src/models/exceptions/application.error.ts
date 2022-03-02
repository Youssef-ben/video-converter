import { logger } from '../../utils/winston.logger';
import { BaseCustomError, ErrorDetails } from './base.error';

export class ApplicationError extends BaseCustomError {
  statusCode = 400;

  constructor(public message: string, public error_type: string) {
    super(message || 'Unexpected application error!');

    this.error_type = error_type || 'api.err.unexpected_error';
    this.message = this.message || 'Unexpected application error!';

    Object.setPrototypeOf(this, ApplicationError.prototype);
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
