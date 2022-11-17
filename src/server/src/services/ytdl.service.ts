import { createWriteStream } from 'fs-extra';
import ytdl, { getVideoID } from 'ytdl-core';
import { GetYoutubeFile } from '../models/vytc/downloaded_video_result.model';
import { FileType } from '../models/vytc/file_extensions.enum';
import { DownloadProgressEvent, WsMessages } from '../models/vytc/websocket.events';
import { getFileQuality, getFileTemporaryPath } from '../utils/helpers';
import { logger } from '../utils/winston.logger';

class YtdlService {
  private loggerId = 'Service::ytdl::';

  /**
   * Get the {id} of the video from the specified Youtube URL.
   *
   * @param url The youtube video URL.
   * @returns Video ID if found, null otherwise.
   */
  extractVideoID = (url: string): string | null => {
    try {
      return getVideoID(url);
    } catch (error) {
      return null;
    }
  };

  downloadAsync = async (ytFile: GetYoutubeFile, forAudio: boolean, progressCallback?: (value: DownloadProgressEvent) => void): Promise<void> =>
    new Promise((resolve, reject) => {
      const isAudio = ytFile.type === FileType.AUDIO_ONLY;
      logger.debug(`${this.loggerId}Downloading the (${isAudio ? 'audio' : 'video'}) file for (${ytFile.id}) with (${ytFile.quality}) quality!`);

      /**
       * Limit the number of times we trigger the emit progress,
       * to prevent the UI from refreshing every few milliseconds.
       */
      let limitProgressTrigger = false;

      const filePath = getFileTemporaryPath(ytFile.key, ytFile.type, ytFile.extension);

      // Set the progress values based on the current step.
      const progressText = forAudio ? WsMessages.WsFetchingVideo : WsMessages.WsFetchingDetails;
      const totalSteps = forAudio ? 2 : ytFile.extension === 'mp4' ? 4 : 5;
      const baseProgress = isAudio ? 0 : 50;
      let progressValue = isAudio ? 0 : 50;

      if (progressCallback) {
        progressCallback({
          key: ytFile.key,
          text: progressText,
          progress: progressValue,
        });
      }

      ytdl(ytFile.id, {
        quality: getFileQuality(ytFile.type, ytFile.quality),
        filter: isAudio ? 'audioonly' : 'videoonly',
      })
        .on('progress', (_, downloaded, total) => {
          // Calculate the download progress.
          if (!limitProgressTrigger && progressCallback) {
            progressValue = baseProgress + Math.floor(((downloaded / total) * 100) / totalSteps);
            progressCallback({
              key: ytFile.key,
              text: progressText,
              progress: progressValue,
            });

            // Disable progress update.
            limitProgressTrigger = true;

            // Activate progress update.
            setTimeout(() => {
              limitProgressTrigger = false;
            }, 500);
          }
        })
        .on('error', (err: Error) => {
          reject(WsMessages.WsErrorFetching);
        })
        .on('finish', () => {
          if (progressCallback)
            progressCallback({
              key: ytFile.key,
              text: progressText,
              progress: progressValue,
            });

          setTimeout(() => {
            logger.debug(`${this.loggerId}Finished downloading the (${isAudio ? 'audio' : 'video'}) file for (${ytFile.id})!`);
            resolve();
          }, 1000);
        })
        .pipe(createWriteStream(filePath));
    });
}

export default new YtdlService();
