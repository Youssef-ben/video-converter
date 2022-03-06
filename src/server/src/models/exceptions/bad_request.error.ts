import { logger } from '../../utils/winston.logger';
import { BaseCustomError, ErrorDetails } from './base.error';

export class BadRequestError extends BaseCustomError {
  statusCode = 400;

  constructor(public message: string, public error_type: string) {
    super(message || 'Bad Request!');

    this.error_type = error_type || 'api.err.bad_request';
    this.message = this.message || 'Bad Request!';

    Object.setPrototypeOf(this, BadRequestError.prototype);
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
