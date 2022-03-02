import { Get, Query, Route, Tags } from 'tsoa';

// Custom
import { ApiResponse } from '../models/response/api.response';
import { logger } from '../utils/winston.logger';
import DownloaderService from '../services/downloader.service';
import { FileDownloadDetails } from '../models/vytc/file_download_details.model';
import { FileType } from '../models/vytc/file_extensions.enum';
import { BadRequestError } from '../models/exceptions/bad_request.error';

@Route('downloader')
@Tags('downloader')
class DownloaderController {
  private loggerId = 'Controller::Downloader::';

  public readonly name = 'Downloader';
  public readonly Routes = {
    Download: '/',
    Validate: '/validate',
  };

  /**
   * Download the the requested file with the desired format and name.
   *
   * @param key The video key returned by the fetch action.
   * @param title The title of the video to be downloaded with.
   * @param type The type of the file [Audio || Video].
   * @returns Returns the file to be downloaded.
   */
  @Get('/')
  async getDownloadVideo(@Query('key') key: string, @Query('title') title: string, @Query('type') type: FileType): Promise<ApiResponse<FileDownloadDetails>> {
    logger.info(`${this.loggerId}Downloading the requested video ([${key} - ${title}] as [${type}])...`);
    const result = DownloaderService.getDownloadedVideo(key, title, type);
    if (!result) {
      throw new BadRequestError(`The video with the (key:${key}) was not found!`, 'api.err.video_not_found');
    }

    return new ApiResponse<FileDownloadDetails>(result);
  }
}

export default new DownloaderController();
