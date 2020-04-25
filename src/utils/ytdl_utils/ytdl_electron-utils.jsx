/**
 * Helper for the {YTDL-CORE} library for Electron.
 */

import * as path from 'path';

import {
  getVideoIdFromUrl,
  convertSecondesToHMS,
  getDownloadFolder,
} from '../constants';
import AbortedAction from './aborted_action';

const { remote } = window.require('electron');
const ytdl = window.require('ytdl-core');
const sanitize = window.require('sanitize-filename');
const fs = window.require('fs-extra');

// Path to where we will save te temporary MP4 file.
const TEMP_DATA_FOLDER = `${remote.app.getPath('userData')}/Cache`;

// Default storage for the downloaded videos.
const DEFAULT_DOWNLOAD_FOLDER = remote.app.getPath('downloads');

export const PROGRESS_MESSAGES = {
  DONLOADING: 'Downloading...',
  DOWNLOADING_FINISHED: 'Downloading completed.',
  CONVERTING: 'Converting...',
  CONVERTING_COMPLETED: 'Converting completed.',
};

/**
 * Get the path to where we should save the MP4 file.
 * If the method is called for a temporary MP4 file,
 * the method will return the path `%APPDATA%/roaming/online video converter/Cache`.
 * Otherwise it returns the `user selected` folder or the `downloads` folder as default.
 */
function getVideoStoragePath(title, forDownload = true) {
  if (forDownload) {
    return path.join(
      getDownloadFolder(DEFAULT_DOWNLOAD_FOLDER),
      `${title}.mp4`
    );
  }

  return path.join(TEMP_DATA_FOLDER, `tmp_${title}.mp4`);
}

export function getDefaultVideoInfos() {
  return {
    id: '',
    title: '',
    duration: '00:00:00',
    link: 'https://www.youtube.com/watch?v=O0YxeTjFn70',
    thumbnail: '',
  };
}

export async function fetchVideoDetailsAsync(url) {
  try {
    // Get the ID from the URL.
    const videoId = getVideoIdFromUrl(url, true);

    // Get the video details.
    const info = await ytdl.getInfo(videoId);

    return {
      id: videoId,
      title: sanitize(info.title),
      duration: convertSecondesToHMS(info.length_seconds),
      link: info.video_url,
      thumbnail: info.player_response.videoDetails.thumbnail.thumbnails[2],
    };
  } catch (error) {
    console.log(error);
  }
}

export async function removeCanceledFile(filePath) {
  setTimeout(() => {
    fs.removeSync(filePath);
  }, 500);
}

export async function downloadAsMP4Async(
  videoDetails,
  forDownload,
  stateProgressCallback,
  abortSignal
) {
  return new Promise((resolve, reject) => {
    // Get the path for the temporary video.
    const mp4Path = getVideoStoragePath(videoDetails.title, forDownload);

    // Create the mp4 video object.
    const mp4 = ytdl(videoDetails.link, {
      filter: forDownload ? 'video' : 'audioonly',
    });

    // Limit the number of times we trigger the UI progress.
    // to prevent the UI from refreshing every few milliseconds.
    let limitProgressTrigger = false;

    mp4.on('progress', (chunkLength, downloaded, total) => {
      // Calculate the download progress.
      const progress = Math.floor((downloaded / total) * 100);

      // Execute the CallBack method to update the UI.
      if (!limitProgressTrigger) {
        stateProgressCallback(progress);
      }

      limitProgressTrigger = true;
      setTimeout(() => {
        limitProgressTrigger = false;
      }, 200);
    });

    // Persiste the downloaded stream in the mp4 file.
    const ws = fs.createWriteStream(mp4Path);
    mp4.pipe(ws);

    // Set the Abort Signal
    abortSignal.addEventListener('abort', async () => {
      // Abort the ytdl download action and close the stream.
      mp4.destroy();
      ws.end();

      // Delete the mp4 file.
      removeCanceledFile(mp4Path);

      // Abort the current promise action.
      const error = new AbortedAction(
        mp4Path,
        'Downloading aborted by the user.'
      );
      reject(error);
    });

    // When finished, Update the Progress bar and return the result.
    mp4.on('finish', () => {
      stateProgressCallback(100);

      setTimeout(() => {
        resolve({ video: mp4Path });
      }, 1000);
    });

    mp4.on('destroy', () => {
      console.log('destroyed');
    });
  });
}
