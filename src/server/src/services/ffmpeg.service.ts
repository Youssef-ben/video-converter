import { GetYoutubeFile } from '../models/vytc/downloaded_video_result.model';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import ffprobePath from 'ffprobe-static';
import { DownloadProgressEvent, WsMessages } from '../models/vytc/websocket.events';
import { getFilePath, getFileTemporaryPath } from '../utils/helpers';
import { logger } from '../utils/winston.logger';
import { createWriteStream, removeSync } from 'fs-extra';
import { FileType } from '../models/vytc/file_extensions.enum';
import { ApplicationError } from '../models/exceptions/application.error';

class FFmpegService {
  private loggerId = 'Service::ffmpeg::';

  convertAsync = async (ytFile: GetYoutubeFile, forAudio: boolean, progressCallback?: (value: DownloadProgressEvent) => void): Promise<void> =>
    new Promise((resolve, reject) => {
      const format = ytFile.type === FileType.AUDIO_ONLY ? 'mp3' : 'mp4';
      const isAudio = ytFile.type === FileType.AUDIO_ONLY;

      logger.debug(`${this.loggerId}Started working on the (${ytFile.type}) file to convert into (${format})!`);

      const targetFile = getFileTemporaryPath(ytFile.key, ytFile.type, format);
      const sourceFile = getFileTemporaryPath(ytFile.key, ytFile.type, ytFile.extension);

      // const endTime = convertDurationToTime(ytFile.duration);
      const progressText = forAudio ? WsMessages.WsConverting : WsMessages.WsSettingUpFile;
      const totalSteps = forAudio ? 2 : 4;
      const baseProgress = isAudio ? (forAudio ? 50 : 25) : 75;
      let progressValue = isAudio ? (forAudio ? 50 : 25) : 75;

      if (progressCallback)
        progressCallback({
          key: ytFile.key,
          text: progressText,
          progress: progressValue,
        });

      ffmpeg(sourceFile)
        .setFfmpegPath(ffmpegPath.replace('app.asar', 'app.asar.unpacked'))
        .format(format)
        .on('progress', function (progress) {
          progressValue = baseProgress + Math.floor(progress.percent / totalSteps);

          // Update the UI state.
          if (progressCallback)
            progressCallback({
              key: ytFile.key,
              text: progressText,
              progress: progressValue,
            });
        })
        .on('error', (err: Error) => {
          reject(WsMessages.WsErrorSettingUpFile);
        })
        .on('end', () => {
          removeSync(sourceFile);
          if (progressCallback)
            progressCallback({
              key: ytFile.key,
              text: progressText,
              progress: progressValue,
            });

          logger.debug(`${this.loggerId}Finished working on the (${ytFile.type}) file to convert into (${format})!`);
          resolve();
        })
        .output(createWriteStream(targetFile))
        .run();
    });

  combineAudioAndVideoAsync = async (ytFile: GetYoutubeFile, progressCallback?: (value: DownloadProgressEvent) => void): Promise<void> =>
    new Promise((resolve, reject) => {
      logger.debug(`${this.loggerId}Started working on combining the audio and video files for (${ytFile.id})`);

      const targetPath = getFilePath(ytFile.key, 'mp4');
      const videoPath = getFileTemporaryPath(ytFile.key, FileType.VIDEO, 'mp4');
      const audioPath = getFileTemporaryPath(ytFile.key, FileType.AUDIO_ONLY, 'mp3');

      // const endTime = convertDurationToTime(ytFile.duration);
      const baseProgress = 75;
      let progressValue = 75;

      // Set the progress to 0%
      if (progressCallback)
        progressCallback({
          key: ytFile.key,
          text: WsMessages.WsSettingUpFile,
          progress: progressValue,
        });

      ffmpeg()
        .setFfmpegPath(ffmpegPath.replace('app.asar', 'app.asar.unpacked'))
        .setFfprobePath(ffprobePath.path)
        .input(videoPath)
        .input(audioPath)
        .outputOptions('-c copy -map 0:v:0 -map 1:a:0 -f mp4 -c:v libx264 -crf 19 -profile:v high'.split(' '))
        .on('error', function (err: Error) {
          throw new ApplicationError(err.message, WsMessages.WsErrorConverting);
        })
        .on('progress', function (progress) {
          progressValue = baseProgress + Math.floor(progress.percent / 4);

          // Update the UI state.
          if (progressCallback)
            progressCallback({
              key: ytFile.key,
              text: WsMessages.WsConverting,
              progress: Math.floor(progressValue),
            });
        })
        .on('error', (err: Error) => {
          reject(WsMessages.WsErrorSettingUpFile);
        })
        .on('end', () => {
          removeSync(videoPath);
          removeSync(audioPath);

          if (progressCallback)
            progressCallback({
              key: ytFile.key,
              text: WsMessages.WsConverting,
              progress: 100,
            });

          logger.debug(`${this.loggerId}Finished working on combining the audio and video files for (${ytFile.id})`);
          resolve();
        })
        .save(targetPath);
    });
}

export default new FFmpegService();