/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import omitEmpty from 'omit-empty';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

/**
 * Defines some tools to format the Json Request and response.
 */
class JsonFormatterMiddleware {
  /**
   * Removes the empty values from the request.
   *
   * @returns ExpressJs pass to Next middleware.
   */
  requestRemoveEmptyProperties = () =>
    function (req: Request, res: Response, next: NextFunction): void {
      req.body = omitEmpty(req.body);
      req.params = omitEmpty(req.params) as ParamsDictionary;
      req.query = omitEmpty(req.query) as Query;

      next();
    };

  /**
   * Convert the {request} body, params and query to {CamelCase}.
   */
  requestToCamelCaseMiddleware = () =>
    function (req: Request, res: Response, next: NextFunction): void {
      req.body = camelcaseKeys(req.body, { deep: true });
      req.params = camelcaseKeys(req.params);
      req.query = camelcaseKeys(req.query);

      next();
    };

  /**
   * Convert the {response} body to {snake_case}.
   */
  responseToSnakeCaseMiddleware = () =>
    function (req: Request, res: Response, next: NextFunction): void {
      const performSend = res.send;

      // Set default response to JSON except the documentations.
      if (!req.url.includes('/docs')) {
        res.setHeader('Content-Type', 'application/json');
      }

      res.send = (body: any): any => {
        let formattedBody = body;

        if (typeof body === 'object' && body != null) {
          formattedBody = snakecaseKeys(body);
        }

        performSend.call(res, formattedBody);
      };

      next();
    };
}

export default new JsonFormatterMiddleware();
