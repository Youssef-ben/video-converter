import { ValidationError } from 'express-validator';
import { logger } from '../../utils/winston.logger';
import { BaseCustomError, ErrorDetails } from './base.error';

export class RequestValidationError extends BaseCustomError {
  statusCode = 400;
  error_type = 'api.err.validation';

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
    logger.error(this.toJson());
  }

  serializeErrors(): ErrorDetails[] {
    return this.errors.map((err) => ({
      message: err.msg,
      field: err.type,
    }));
  }
}
