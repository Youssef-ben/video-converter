import AvailableScreen from '../../types/available_screen';
import { FileType } from '../../types/vytc/file_extensions.enum';
import { FileQuality } from '../../types/vytc/file_quality.enum';
import { YoutubeVideoDetails } from '../../types/vytc/video_details.model';
import { getYoutubeData } from '../../utils/helpers';
import { ActionMap } from '../helpers';

export type YtDownloaderType = {
  ytData?: YoutubeVideoDetails;
  screen?: AvailableScreen;
  fileType?: FileType;
  quality?: FileQuality;
};

export enum YtDownloaderActions {
  AddData = 'ADD_YT_DATA',
  UpdateScreen = 'UPDATE_SCREEN',
  UpdateFileType = 'UPDATE_FILE_TYPE',
  UpdateFileQuality = 'UPDATE_FILE_QUALITY',

  StartConverting = 'START_CONVERTING',
}

type YtDownloaderPayload = {
  [YtDownloaderActions.AddData]: {
    ytData: YoutubeVideoDetails;
  };
  [YtDownloaderActions.UpdateScreen]: {
    screen: AvailableScreen;
  };
  [YtDownloaderActions.UpdateFileType]: {
    fileType: FileType;
  };
  [YtDownloaderActions.UpdateFileQuality]: {
    quality: FileQuality;
  };

  [YtDownloaderActions.StartConverting]: {
    ytData: YoutubeVideoDetails;
    screen: AvailableScreen;
    fileType: FileType;
    quality: FileQuality;
  };
};

// Read the data from the.
export const YtDownloaderInitialState: YtDownloaderType = {
  ytData: getYoutubeData(),
  screen: undefined,
  fileType: undefined,
  quality: FileQuality.DEFAULT,
};

/**
 * Available Youtube Downloader Actions.
 */
export type YtDownloaderAction = ActionMap<YtDownloaderPayload>[keyof ActionMap<YtDownloaderPayload>];
