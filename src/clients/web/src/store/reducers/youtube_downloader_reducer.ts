/* eslint-disable import/prefer-default-export */
import { YtDownloaderAction, YtDownloaderActions, YtDownloaderType } from '../actions/youtube_download_actions';

export const YtDownloaderReducer = (state: YtDownloaderType, action: YtDownloaderAction): YtDownloaderType => {
  switch (action.type) {
    case YtDownloaderActions.AddData:
      return {
        ...state,
        ytData: action.payload.ytData,
      };

    case YtDownloaderActions.UpdateScreen:
      return {
        ...state,
        screen: action.payload.screen,
      };

    case YtDownloaderActions.UpdateFileType:
      return {
        ...state,
        fileType: action.payload.fileType,
      };

    case YtDownloaderActions.UpdateFileQuality:
      return {
        ...state,
        quality: action.payload.quality,
      };

    case YtDownloaderActions.StartConverting:
      const { ytData, screen, fileType, quality } = action.payload;
      return {
        ...state,
        ytData,
        screen,
        fileType,
        quality,
      };

    default:
      return state;
  }
};
