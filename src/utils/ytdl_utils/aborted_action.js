export default class AbortedAction extends Error {
  constructor(filepath, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AbortedAction);
    }
    this.name = 'AbortedAction';
    this.filepath = filepath;
  }
}
