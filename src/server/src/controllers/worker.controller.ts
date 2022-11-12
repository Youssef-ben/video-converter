import { Get, Post, Query, Route, Tags } from 'tsoa';
import { YoutubeVideoDetails } from '../models/vytc/video_details.model';
import { BadRequestError } from '../models/exceptions/bad_request.error';
import WorkerService from '../services/worker.service';

// Custom
import { ApiResponse } from '../models/response/api.response';
import { logger } from '../utils/winston.logger';

@Route('worker')
@Tags('worker')
class WorkerController {
  private loggerId = 'Controller::Worker::';

  public readonly name = 'Worker';
  public readonly Routes = {
    Fetch: '/fetch',
    Upload: '/upload',
  };

  /**
   * Gets the details of the given youtube video.
   *
   * @param videoUrl The url of the Youtube video to be downloaded.
   */
  @Get('/fetch')
  async getYoutubeVideoDetails(@Query('video_url') videoUrl: string): Promise<ApiResponse<YoutubeVideoDetails>> {
    logger.info(`${this.loggerId}Fetching the youtube video details (${videoUrl})...`);

    const result = await WorkerService.fetchVideoDetailsAsync(videoUrl);
    if (!result) {
      throw new BadRequestError('Invalid youtube url!', 'api.err.worker.invalid_url');
    }

    return new ApiResponse<YoutubeVideoDetails>(result);
  }

  /**
   * Upload the video file to be converted.
   */
  @Post('/upload')
  async postUploadVideoFile(): Promise<ApiResponse<Record<string, string>>> {
    logger.info(`${this.loggerId}Uploading received file...`);

    return new ApiResponse<Record<string, string>>({ response: 'not implemented yet!' });
  }
}

export default new WorkerController();
