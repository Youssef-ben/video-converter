import { Router, Response, Request } from 'express';
import { query } from 'express-validator';
import sanitize from 'sanitize-filename';
import { removeSync } from 'fs-extra';
import { Guid } from 'js-guid';

// Custom
import DownloaderController from '../controllers/downloader.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { BadRequestError } from '../models/exceptions/bad_request.error';
import { FileType } from '../models/vytc/file_extensions.enum';
import { logger } from '../utils/winston.logger';
import BaseRoutesConfig from './base.routes.config';

class DownloaderRoutes extends BaseRoutesConfig {
  private loggerId = 'API::Downloader::';

  constructor() {
    super(DownloaderController.name);
  }

  protected configureRoutes(): Router {
    const { Routes } = DownloaderController;

    const validation = [
      query('key').trim().notEmpty().withMessage('The field [key] is required!'),
      query('title').trim().notEmpty().withMessage('The field [title] is required!'),
      query('type').trim().notEmpty().withMessage('The field [type] is required!'),
    ];

    // Download.
    this.router.get(Routes.Download, validation, [validateRequest], async (req: Request, res: Response) => {
      if (!Object.values(FileType).includes(req.query.type as FileType)) {
        throw new BadRequestError(`File type (${req.query.extension}) not supported!`, 'api.err.unsupported_file_type');
      }

      const qu = {
        key: req.query.key as string,
        title: sanitize(req.query.title as string).replace(/[`~!@#$%^&*_|+\-=?;:'",.<>\\/]/gi, ''),
        type: req.query.type as FileType,
      };

      // Check the values
      if (!Guid.isValid(qu.key as string)) {
        throw new BadRequestError('Invalid file key!', 'api.err.invalid_file_key');
      }

      // Get the download link.
      const response = (await DownloaderController.getDownloadVideo(qu.key, qu.title, qu.type)).result;

      // Returns and start the download. Should clean the resources after finishing.
      res.setHeader('Content-disposition', `attachment; filename=${encodeURI(response.name)}`);
      res.setHeader('Content-type', qu.type === FileType.AUDIO_ONLY ? 'audio/mp3' : 'video/mp4');

      return res.download(response.fullPath, response.name, (err) => {
        if (err) {
          logger.error(err);
        }

        // Clean the resources.
        logger.debug(this.loggerId + 'Downloading::Cleaning the temporary files...');
        setTimeout(() => {
          removeSync(response.filePath);
        }, 600000); // 10 mins
      });
    });

    return this.router;
  }
}

export default new DownloaderRoutes();
