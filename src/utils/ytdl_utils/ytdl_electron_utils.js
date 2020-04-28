/**
 * Helper for the {YTDL-CORE} library for Electron.
 */

import AbortedAction from './aborted_action';

import { convertSecondesToHMS, getMp3Bitrate } from '../constants';

import {
  getVideoIdFromUrl,
  getMP4FilePath,
  getMP3FilePath,
  getTimeFromDuration,
} from './ytdl_helpers';

const ytdl = window.require('ytdl-core');
const sanitize = window.require('sanitize-filename');
const fs = window.require('fs-extra');
const ffmpeg = window.require('fluent-ffmpeg');
const ffmpegPath = window.require('ffmpeg-static');

export async function fetchVideoInfoAsync(url) {
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
}

export async function removeTempFile(filePath) {
  fs.removeSync(filePath);
}

export async function convertStreamToMP4Async(
  videoDetails,
  forDownload,
  abortSignal,
  stateProgressCallback
) {
  return new Promise((resolve, reject) => {
    // Get the path for the temporary video.
    const mp4Path = getMP4FilePath(videoDetails.title, forDownload);

    /**
     * Limit the number of times we trigger the UI progress,
     * to prevent the UI from refreshing every few milliseconds.
     */
    let limitProgressTrigger = false;

    /**
     * Create the mp4 video object.
     *
     * Note: Used `{video}` instead of `{audioonly}` because it's
     * faster to download that audio only.
     */
    const mp4 = ytdl(videoDetails.link, {
      filter: 'video',
    });

    // Persiste the downloaded stream in the mp4 file.
    const ws = fs.createWriteStream(mp4Path);

    mp4
      .on('progress', (chunkLength, downloaded, total) => {
        // Calculate the download progress.
        const progress = Math.floor((downloaded / total) * 100);

        if (!limitProgressTrigger) {
          stateProgressCallback(progress);
          stateProgressCallback(Math.floor(progress));

          limitProgressTrigger = true;
        }

        setTimeout(() => {
          limitProgressTrigger = false;
        }, 100);
      })
      .pipe(ws)
      .on('finish', () => {
        // When finished, Update the Progress bar and return the result.
        stateProgressCallback(100);

        setTimeout(() => {
          resolve({ path: mp4Path });
        }, 1000);
      });

    // Set the Abort Signal
    abortSignal.addEventListener('abort', () => {
      // Abort the ytdl download action and close the stream.
      mp4.destroy();
      ws.end();

      // Delete the mp4 file.
      if (!forDownload) {
        removeTempFile(mp4Path);
      }

      // Abort the current promise action.
      const error = new AbortedAction(
        mp4Path,
        'Downloading aborted by the user.'
      );
      reject(error);
    });
  });
}

export async function convertMP4ToMP3Async(
  videoDetails,
  stateProgressCallback
) {
  return new Promise((resolve) => {
    // Get the MP3 storage folder.
    const mp3Path = getMP3FilePath(videoDetails.title, true);

    /**
     * Note: The MP4 file path will always be in the {TEMP_DATA_FOLDER}
     * when converting to MP3.
     */
    const mp4Path = getMP4FilePath(videoDetails.title, false);

    /**
     * Limit the number of times we trigger the UI progress,
     * to prevent the UI from refreshing every few milliseconds.
     */
    let limitProgressTrigger = false;

    // Convert the video duration to time.
    const endTime = getTimeFromDuration(videoDetails.duration);

    ffmpeg(mp4Path)
      .setFfmpegPath(ffmpegPath.replace('app.asar', 'app.asar.unpacked'))
      .format('mp3')
      .audioBitrate(getMp3Bitrate())
      .output(fs.createWriteStream(mp3Path))
      .on('progress', function (progress) {
        if (!limitProgressTrigger) {
          const currentTime = getTimeFromDuration(progress.timemark);
          const percent = (currentTime * 100) / endTime;

          // Update the UI state.
          stateProgressCallback(Math.floor(percent));

          limitProgressTrigger = true;
        }

        setTimeout(() => {
          limitProgressTrigger = false;
        }, 200);
      })
      .on('end', () => {
        // Set the UI progress-bar state to 99%.
        // the 1% is for the temporary file deletion.
        stateProgressCallback(99);
        resolve({ path: mp3Path });
      })
      .run();
  });
}
