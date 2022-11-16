import { useState } from 'react';

import * as FileSystem from 'expo-file-system';
import * as mime from 'mime';
import { useTranslation } from 'react-i18next';
import { Alert, Platform } from 'react-native';

import { useAppContext } from 'common/store/vytc-context/provider';
import { FileType } from 'common/store/vytc-context/types';
import { SERVER_URLS } from 'common/utils/constants';

const { StorageAccessFramework } = FileSystem;

const TEMPORARY_FOLDER = `${FileSystem.documentDirectory}`;

export const useDownloadFinished = () => {
  const { t } = useTranslation();
  const { vyt, clear, appPermissions } = useAppContext();
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

  const getPermissionsAsync = async (isAudio: boolean): Promise<string> => {
    //  Request Permissions
    const directoryPermission = await appPermissions();
    if (directoryPermission) {
      return directoryPermission;
    }

    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync(isAudio ? 'Music' : 'Movies');
    if (!permissions.granted) {
      Alert.alert('Permission Required!', 'Permission to save the downloaded file is required, please try Again!');
      return '';
    }

    //Set the permissions.
    return await appPermissions(permissions.directoryUri);
  };

  const saveDownloadAsync = async (temporaryFile: string) => {
    if (Platform.OS !== 'android') {
      Alert.alert('Unsupported Platform', 'The current platform is not supported at the moment!');
    }

    const isAudio = vyt.download.fileType === FileType.AUDIO_ONLY;
    const mimeType = mime.getType(`*.${isAudio ? 'mp3' : 'mp4'}`) as string;

    try {
      //  Request Permissions
      const directoryPermission = await getPermissionsAsync(isAudio);
      if (!directoryPermission) {
        return;
      }

      // Create empty folder
      const dummyFile = await StorageAccessFramework.createFileAsync(directoryPermission, `${vyt.data?.title}`, mimeType);

      // Read the file as string from the temporary folder.
      const streamData = await FileSystem.readAsStringAsync(temporaryFile, { encoding: FileSystem.EncodingType.Base64 });

      // Copy Content to the created file
      await FileSystem.writeAsStringAsync(dummyFile, streamData, { encoding: FileSystem.EncodingType.Base64 });

      Alert.alert(t('app.download.mobile.finished.title'), t('app.download.mobile.finished.message'));
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
      await saveDownloadAsync(uri);

      // Clear the vytc
      setTimeout(() => {
        clear();
      }, 1000);
    } catch (exception) {
      Alert.alert(t('app.err.unhandled_error.title'), t('app.err.unhandled_error.desc'));
    }
  };

  return { progress, downloadAsync };
};
