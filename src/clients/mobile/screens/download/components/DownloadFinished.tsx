import React, { useEffect, useState } from 'react';

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import { useTranslation } from 'react-i18next';
import { Alert, Platform } from 'react-native';

import { useAppContext } from 'common/store/vytc-context/provider';
import { SERVER_URLS } from 'common/utils/constants';
import ProgressBar from 'components/ProgressBar';
import { AppView } from 'components/ui';

const { StorageAccessFramework } = FileSystem;

const TEMPORARY_FOLDER = `${FileSystem.documentDirectory}`;

const useDownloadFinished = () => {
  const { t } = useTranslation();
  const { vyt } = useAppContext();
  const [progress, setProgress] = useState(0);

  const progressCallback = (value: FileSystem.DownloadProgressData) => {
    const total = Math.round(value.totalBytesWritten / value.totalBytesExpectedToWrite);
    setProgress(total * 100);
  };

  const ensureFolderExistAsync = async (folderPath: string, intermediates = true): Promise<FileSystem.FileInfo> => {
    // Check if folder exist
    const folderOptions = await FileSystem.getInfoAsync(folderPath);
    if (folderOptions.exists && folderOptions.isDirectory) {
      return folderOptions;
    }

    // Folder doesn't exist. Create new one.
    await FileSystem.makeDirectoryAsync(folderPath, { intermediates });
    return await ensureFolderExistAsync(folderPath, intermediates);
  };

  const share = async (asset: MediaLibrary.Asset) => {
    console.log(asset.filename.split('.'));

    console.log(asset.filename.split('.').length);

    await shareAsync(asset.uri, {
      UTI: '.' + asset.filename.split('.')[asset.filename.split('.').length - 1],
      mimeType: 'application/' + asset.filename.split('.')[asset.filename.split('.').length - 1],
    });
  };

  const saveDownloadAsync = async (temporaryFile: string) => {
    if (Platform.OS !== 'android') {
      // eslint-disable-next-line no-console
      console.log('UnSupported platform at the moment!');
    }

    console.log('Finished downloading to ', temporaryFile);
    MediaLibrary.createAssetAsync(temporaryFile).then((asset) => {
      console.log('asset', asset);
      share(asset);
      MediaLibrary.createAlbumAsync('Downloads', asset)
        .then(() => {
          alert('download complete');
        })
        .catch((error) => {
          alert('issue with download contact support');
        });
    });

    try {
    } catch (exception) {
      Alert.alert(t('app.err.unhandled_error.title'), t('app.err.unhandled_error.desc') + ` - [${exception}]`);
    }
  };

  const downloadAsync = async () => {
    // Make sure to create the folder in android.
    if (Platform.OS === 'android') {
      ensureFolderExistAsync(TEMPORARY_FOLDER);
    }

    // Download the file to the temporary folder.
    const temporaryFile = TEMPORARY_FOLDER + vyt.data?.title;
    const url = SERVER_URLS.base + vyt.download.downloadLink;
    const downloadResumable = FileSystem.createDownloadResumable(url, temporaryFile, {}, progressCallback);

    // Start the download process.
    try {
      const { uri } = (await downloadResumable.downloadAsync()) as FileSystem.FileSystemDownloadResult;

      // Save the file.
      saveDownloadAsync(uri);
    } catch (exception) {
      Alert.alert(t('app.err.unhandled_error.title'), t('app.err.unhandled_error.desc'));
    }
  };

  return { progress, downloadAsync };
};

const DownloadFinished = () => {
  const { t } = useTranslation();
  const { progress, downloadAsync } = useDownloadFinished();

  useEffect(() => {
    downloadAsync();
  }, []);

  return (
    <AppView>
      <ProgressBar text={t('app.download.download.started')} progress={progress} />
    </AppView>
  );
};

export default DownloadFinished;
