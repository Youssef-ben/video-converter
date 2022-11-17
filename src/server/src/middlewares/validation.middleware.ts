import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../models/exceptions/validation.error';
import { logger } from '../utils/winston.logger';

const loggerId = 'Middleware::Validation::';

/**
 * Middleware to validate that the request doesn't contain validation errors.
 *
 * @param req ExpressJS Request
 * @param res ExpressJS Response
 * @param next ExpressJS Next middleware
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  logger.debug(`${loggerId}Validating the request body and query...`);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.error(`${loggerId}Error::Model validation failed!`);
    throw new RequestValidationError(errors.array());
    return;
  }

  logger.debug(`${loggerId}Model validation succeeded!`);
  next();
};
