import { Router, Response, Request } from 'express';
import { body } from 'express-validator';

// Custom
import SecurityController from '../controllers/security.controller';
import { validateAuthorizationToken as authValidation } from '../middlewares/security.middleware';
import { validateRequest } from '../middlewares/validation.middleware';
import BaseRoutesConfig from './base.routes.config';

class SecurityRoutes extends BaseRoutesConfig {
  constructor() {
    super(SecurityController.name);
  }

  protected configureRoutes(): Router {
    const { Routes } = SecurityController;

    // Login
    const validation = [
      body('passphrase').notEmpty().withMessage('The field [passphrase] is required!'),
      body('passphrase').isLength({ min: 6 }).withMessage('Invalid passphrase value!'),
    ];
    this.router.post(Routes.Login, validation, validateRequest, async (req: Request, res: Response) => {
      const result = await SecurityController.postLogin(req.body);
      return res.send(result);
    });

    // Refresh Token
    this.router.get(Routes.Refresh, authValidation, async (req: Request, res: Response) => {
      const result = await SecurityController.getRefreshedToken(req.accessToken);
      return res.send(result);
    });

    // Logout
    this.router.delete(Routes.Logout, authValidation, async (req: Request, res: Response) => {
      const result = await SecurityController.deleteLogout(req.accessToken);
      return res.send(result);
    });

    return this.router;
  }
}

export default new SecurityRoutes();
