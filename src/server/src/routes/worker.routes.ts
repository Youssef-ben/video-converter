import { Router, Response, Request } from 'express';
import { query } from 'express-validator';

// Custom
import { validateAuthorizationToken as authValidation } from '../middlewares/security.middleware';
import WorkerController from '../controllers/worker.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import BaseRoutesConfig from './base.routes.config';

class WorkerRoutes extends BaseRoutesConfig {
  constructor() {
    super(WorkerController.name);
  }

  protected configureRoutes(): Router {
    const { Routes } = WorkerController;

    // Fetch details.
    const validation = [query('videoUrl').notEmpty().withMessage('The field [video_url] is required!')];
    this.router.get(Routes.Fetch, validation, [authValidation, validateRequest], async (req: Request, res: Response) => {
      const response = await WorkerController.getYoutubeVideoDetails(req.query.videoUrl as string);
      return res.send(response);
    });

    // Upload file.
    this.router.post(Routes.Upload, authValidation, async (_: Request, res: Response) => {
      const response = await WorkerController.postUploadVideoFile();
      return res.send(response);
    });

    return this.router;
  }
}

export default new WorkerRoutes();
