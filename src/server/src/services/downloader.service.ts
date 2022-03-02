// Custom
import { FileDownloadDetails } from '../models/vytc/file_download_details.model';
import { YoutubeVideoDetails } from '../models/vytc/video_details.model';
import { logger } from '../utils/winston.logger';
import { existsSync } from 'fs-extra';
import { DownloadProgressEvent } from '../models/vytc/websocket.events';
import { FileType } from '../models/vytc/file_extensions.enum';
import { Guid } from 'js-guid';
import { GetYoutubeFile } from '../models/vytc/downloaded_video_result.model';
import YtdlService from './ytdl.service';
import FfmpegService from './ffmpeg.service';
import { getFileFolder, getFilePath, getFileTemporaryPath } from '../utils/helpers';
import { FileQuality } from '../models/vytc/file_quality.enum';

class DownloaderService {
  private loggerId = 'Service::Downloader::';

  /**
   * Start the download process based on the file type.
   *
   * The following logic is considered to be the best option to download a video or audio file
   * from youtube using {ytdl-core} library, since when using the option {highest} it download
   * the file with the best quality audio and video and this gives a low quality file.
   *
   * Audio:
   *  - Download the {audio} file from youtube with the given quality.
   *  - Convert to an {MP3} format if the file is in an other format.
   *
   * Video:
   *  - Download the {audio} file from youtube with the given quality.
   *  - Convert to an {MP3} format if the file is in an other format.
   *  - Download the {video} file from youtube with the given quality.
   *  - Convert to an {MP4} format if the file is in an other format.
   *  - Merge the {audio} and {video} together and return a download link.
   *
   * @param video The details of the video to be downloaded.
   * @param type The video type, see <FileType.ts> enumerator.
   * @param quality The video quality, see <FileQuality.ts> enumerator.
   * @param progressCallback Custom Callback to get the a live progress.
   *
   * @returns The download link.
   */
  public startDownloadProcessAsync = async (
    video: YoutubeVideoDetails,
    type: FileType,
    quality: FileQuality,
    progressCallback?: (value: DownloadProgressEvent) => void
  ): Promise<string> => {
    // Clean the title.
    video.title = video.title.replace(/[`~!@#$%^&*_|+\-=?;:'",.<>\\/]/gi, '');
    logger.debug(`${this.loggerId}Processing the video (${video.id} - ${video.title}) as (${type})...`);

    // Set the required model for the ytdl/ffmpeg services.
    const youtubeFile: GetYoutubeFile = {
      key: Guid.newGuid().toString(),
      id: video.id,
      duration: video.duration,
      extension: video.extensions.audio,
      quality: quality,
      type: FileType.AUDIO_ONLY,
    };

    // In both types, download the audio only and convert to mp3.
    logger.debug(`${this.loggerId}Fetching the audio file for (${video.id})...`);
    await YtdlService.downloadAsync(youtubeFile, type === FileType.AUDIO_ONLY, progressCallback);

    logger.debug(`${this.loggerId}Converting the audio file for (${video.id}) to [mp3] format...`);
    await FfmpegService.convertAsync(youtubeFile, type === FileType.AUDIO_ONLY, progressCallback);

    if (type === FileType.VIDEO) {
      await this.downloadVideoFileAsync(youtubeFile, video.id, video.extensions.video, progressCallback);
    }

    logger.debug(`${this.loggerId}Building the url to download the video ${video.id} as ${type} and returning the result...`);
    return `/downloader?key=${youtubeFile.key}&title=${video.title}&type=${youtubeFile.type}`;
  };

  /**
   * Get the youtube video details.
   *
   * @param key The temporary key of the video.
   * @param title The title of the video.
   * @param extension The extension of the video.
   * @returns Return the Downloaded video full path and details.
   */
  public getDownloadedVideo = (key: string, title: string, type: string): FileDownloadDetails | null => {
    logger.debug(`${this.loggerId}Checking that the requested file (${key}) as (${type}) exists...`);

    const extension = type === FileType.AUDIO_ONLY ? 'mp3' : 'mp4';
    const result: FileDownloadDetails = {
      filePath: getFileFolder(key),
      fullPath: type === FileType.AUDIO_ONLY ? getFileTemporaryPath(key, type, extension) : getFilePath(key, extension), // Get the path to the file
      extension: extension,
      name: `${title}.${extension}`,
    };

    if (!existsSync(result.fullPath)) {
      logger.warn(`${this.loggerId}The requested file (${key}) as (${type}) was not found!`);
      return null;
    }

    logger.debug(`${this.loggerId}Found a file (${key}) as (${type}), returning the details!`);
    return result;
  };

  private downloadVideoFileAsync = async (youtubeFile: GetYoutubeFile, videoId: string, extension: string, callback?: (value: DownloadProgressEvent) => void): Promise<void> => {
    logger.debug(`${this.loggerId}Fetching the video file for (${videoId})...`);
    // set the extension to video
    youtubeFile.extension = extension;
    youtubeFile.type = FileType.VIDEO;

    // Download video only.
    await YtdlService.downloadAsync(youtubeFile, false, callback);

    // Convert the video to mp4
    if (extension !== 'mp4') {
      logger.debug(`${this.loggerId}Converting the video file for (${videoId}) to [mp4] format...`);
      await FfmpegService.convertAsync(youtubeFile, false, callback);
    }

    // Merge Audio and Video into one.
    logger.debug(`${this.loggerId}Combining the audio and video files for (${videoId})...`);
    await FfmpegService.combineAudioAndVideoAsync(youtubeFile, callback);
  };
}

export default new DownloaderService();
