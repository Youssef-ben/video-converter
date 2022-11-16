import BaseResponse from './base.response';

export default class ApiResponse<T> extends BaseResponse {
  public readonly result: T;

  constructor(result: T, code = 200, type = '') {
    super(code, type || 'api.success');
    this.result = result;
  }
}
