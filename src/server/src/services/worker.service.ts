import ytdl, { MoreVideoDetails, videoInfo } from 'ytdl-core';
import sanitize from 'sanitize-filename';

// Custom
import { YoutubeVideoDetails } from '../models/vytc/video_details.model';
import { logger } from '../utils/winston.logger';
import { convertSecondesToHMS } from '../utils/helpers';
import YtdlService from './ytdl.service';

class WorkerService {
  private loggerId = 'Service::Worker::';

  /**
   * Validate the url and fetch the details of the given video from youtube.
   *
   * @param url Youtube url
   * @returns The video details.
   */
  public fetchVideoDetailsAsync = async (url: string): Promise<YoutubeVideoDetails | null> => {
    logger.debug(`${this.loggerId}Extracting the video ID from the given url (${url})...`);
    const videoId = YtdlService.extractVideoID(url);
    if (!videoId) {
      return null;
    }

    logger.debug(`${this.loggerId}Fetching the video details from the youtube for the id (${videoId})...`);
    let info: videoInfo;
    try {
      info = await ytdl.getInfo(videoId);
    } catch (error) {
      return null;
    }

    const details: MoreVideoDetails = info.videoDetails;

    // Extract the Audio and Video Container ex:(audio:webm, video:mp4)
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio', filter: 'audioonly' });
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: 'videoonly' });

    logger.debug(`${this.loggerId}Returning the details of the video (${videoId} - ${details.title})...`);
    return {
      id: videoId,
      title: sanitize(details.title.replace('#', '')),
      duration: convertSecondesToHMS(details.lengthSeconds),
      link: details.video_url,
      thumbnail: details.thumbnails.pop(),
      extensions: {
        audio: audioFormat.container,
        video: videoFormat.container,
      },
    };
  };
}

export default new WorkerService();
