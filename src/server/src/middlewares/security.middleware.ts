/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express';
import { UnAuthorizedError } from '../models/exceptions/unauthorized.error';
import securityService from '../services/security.service';
import { logger } from '../utils/winston.logger';

declare global {
  namespace Express {
    // eslint-disable-next-line no-shadow
    interface Request {
      accessToken: string;
    }
  }
}

const loggerId = 'Middleware::Security::';

export const validateAuthorizationToken = (req: Request, _: Response, next: NextFunction): void => {
  logger.info(`${loggerId}Validating that the request has a valid access token!`);

  const token = req.headers['authorization']?.split(' ');
  if (!token || token[0].toLocaleLowerCase() !== 'bearer' || !token[1]) {
    logger.error(`${loggerId}Error::The request has no access token!`);
    throw new UnAuthorizedError();
  }

  logger.debug(`${loggerId}The request has an access token!`);

  logger.debug(`${loggerId}Validating the request token!`);
  const result = securityService.validateToken(token[1]);
  if (!result) {
    logger.error(`${loggerId}Error::UnAuthorized access token!`);
    throw new UnAuthorizedError();
  }

  logger.debug(`${loggerId}Access token validation succeeded!`);
  req.accessToken = token[1];
  return next();
};
