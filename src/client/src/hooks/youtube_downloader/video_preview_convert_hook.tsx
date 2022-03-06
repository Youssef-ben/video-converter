import React from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownProps } from 'semantic-ui-react';
import { YtDownloaderActions } from '../../store/actions/youtube_download_actions';
import { useAppContext } from '../../store/contexts/app_context';
import AvailableScreen from '../../types/available_screen';
import { FileType } from '../../types/vytc/file_extensions.enum';
import { FileQuality } from '../../types/vytc/file_quality.enum';

type UseVideoDownloadHook = {
  qualityOptions: {
    key: FileQuality;
    text: string;
    value: FileQuality;
  }[];

  onQualityChange: (_: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => void;
  setScreenAction: (event: React.MouseEvent<HTMLButtonElement>, type: FileType) => void;
  setTile: (value: string) => void;
};

const useVideoDownloadHook = (): UseVideoDownloadHook => {
  const { t } = useTranslation();
  const {
    state: {
      ytDownloaderState: { ytData, quality },
    },
    dispatch,
  } = useAppContext();

  const [title, setTile] = React.useState<string>(ytData?.title || '');

  // Set the Screen to be shown.
  const setScreenAction = (event: React.MouseEvent<HTMLButtonElement>, fileType: FileType) => {
    event.preventDefault();

    if (!ytData || !fileType || !quality) {
      return;
    }

    if (title && ytData) {
      ytData.title = title.trim().replace(/[`~!@#$%^&*_|+\-=?;:'",.<>\\/]/gi, '');
    }

    dispatch({
      type: YtDownloaderActions.StartConverting,
      payload: {
        ytData,
        screen: AvailableScreen.VIDEO_PREVIEW_PROGRESS,
        fileType,
        quality,
      },
    });
  };

  const onQualityChange = (_: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
    dispatch({
      type: YtDownloaderActions.UpdateFileQuality,
      payload: {
        quality: value as FileQuality,
      },
    });
  };

  const qualityOptions = [
    {
      key: FileQuality.HIGHEST,
      text: t(`app.${FileQuality.HIGHEST}`),
      value: FileQuality.HIGHEST,
    },
    {
      key: FileQuality.DEFAULT,
      text: t(`app.${FileQuality.DEFAULT}`),
      value: FileQuality.DEFAULT,
    },
    {
      key: FileQuality.LOWEST,
      text: t(`app.${FileQuality.LOWEST}`),
      value: FileQuality.LOWEST,
    },
  ];

  return { qualityOptions, onQualityChange, setScreenAction, setTile };
};

export default useVideoDownloadHook;
