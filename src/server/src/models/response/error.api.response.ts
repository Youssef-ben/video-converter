import { BaseCustomError, ErrorDetails } from '../exceptions/base.error';
import { BaseResponse } from './base.response';

export class ErrorApiResponse extends BaseResponse {
  public readonly errors: ErrorDetails[];

  constructor(errors?: BaseCustomError, ex?: Error) {
    super(errors?.statusCode || 500, errors?.error_type || 'api.err.unexpected_error');

    this.errors = errors
      ? errors?.serializeErrors()
      : [
          {
            message: ex?.message || 'Unexpected error occurred while handling your request!',
          },
        ];
  }
}
