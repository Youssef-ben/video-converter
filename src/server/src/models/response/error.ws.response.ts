import { BaseCustomError, ErrorDetails } from '../exceptions/base.error';
import { BaseResponse } from './base.response';

export class ErrorWsResponse extends BaseResponse {
  public readonly errors: ErrorDetails[];

  constructor(statusCode: number, errorType: string, message?: string, errors?: BaseCustomError) {
    super(statusCode, errorType);

    if (errors) {
      this.errors = errors?.serializeErrors();
    } else {
      this.errors = [
        {
          message: message || 'Unexpected error occurred while handling your request!',
        },
      ];
    }
  }
}
