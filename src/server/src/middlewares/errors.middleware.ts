/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import { ErrorApiResponse } from '../models/response/error.api.response';
import { BaseCustomError } from '../models/exceptions/base.error';

export const globalErrorsHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseCustomError) {
    return res.status(err.statusCode).send(new ErrorApiResponse(err));
  }

  res.status(500).send(new ErrorApiResponse(undefined, err));
};
