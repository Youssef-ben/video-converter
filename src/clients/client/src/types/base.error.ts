/* eslint-disable camelcase */
export type ErrorDetails = {
  message: string;
  field?: string;
};

export abstract class BaseCustomError extends Error {
  abstract statusCode: number;

  abstract error_type: string;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BaseCustomError.prototype);
  }

  abstract serializeErrors(): ErrorDetails[];

  toJson(): string {
    return `{status_code: ${this.statusCode}, error_type: "${this.error_type}", message: "${this.message}"}`;
  }
}
