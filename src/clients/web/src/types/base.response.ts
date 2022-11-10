export default class BaseResponse {
  public readonly code: number;

  public readonly type: string;

  constructor(code = 200, type = '') {
    this.code = code;
    this.type = type;
  }
}
