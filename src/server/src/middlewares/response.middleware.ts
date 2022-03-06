import { NextFunction, Response } from 'express';
import { ApiResponse } from '../models/response/api.response';

/**
 * Utils that create and return a unified custom response to the user.
 *
 * @param res ExpressJS Response
 * @param next ExpressJS Next Function for middlewares.
 * @param result Object to be returned in the response.
 * @param code The response HTTP status code.
 * @returns ExpressJS updated response.
 */
export function formatResponse<T>(res: Response, next: NextFunction, result: T, code = 200): Response {
  res.status(code).send(new ApiResponse<T>(result, code));
  next();
  return res;
}
