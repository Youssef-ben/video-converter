import * as path from 'path';
import { getStorageFolder } from '../constants';

const { remote } = window.require('electron');

// eslint-disable-next-line
const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

// eslint-disable-next-line
const dailymotionRegExp = /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;

// Path to where we will save te temporary MP4 file.
export const TEMP_DATA_FOLDER = `${remote.app.getPath('userData')}/Cache`;

// Default storage for the downloaded videos.
export const DEFAULT_DOWNLOAD_FOLDER = remote.app.getPath('downloads');

export const PROGRESS_MESSAGES = {
  DONLOADING: 'Downloading...',
  DOWNLOADING_FINISHED: 'Downloading completed.',
  CONVERTING: 'Converting...',
  CONVERTING_COMPLETED: 'Converting completed.',
  COMPLETED: 'Done.',
};

/**
 * Get the ID of the video from the specified URL(Youtube or Dailymotion).
 *
 * @param {string} url The video URL.
 * @param {bool} isYoutubeUrl {True: Youtube URL}, {False: Dailymotion URL}.
 */
export function getVideoIdFromUrl(url, isYoutubeUrl = true) {
  const result = url.match(isYoutubeUrl ? youtubeRegExp : dailymotionRegExp);

  if (!result) {
    return null;
  }

  // Return the ID of the video Both Youtube and Dailymotion has the ID in the 2 index.
  return result[2];
}

/**
 * Validate that the specified URL is a (Youtube or Dailymotion) URL.
 *
 * @param {string} url The video(Youtube or Dailymotion) URL.
 */
export function isValidUrl(url) {
  // Validate Youtube or Dailymotion URL
  if (!getVideoIdFromUrl(url, true)) {
    return false;
  }

  return true;
}

/**
 * Get the path to where we should save the MP4 file.
 * If the method is called for a temporary MP4 file,
 * the method will return the path `%APPDATA%/roaming/online video converter/Cache`.
 * Otherwise it returns the `{user selected}` folder. (Default to `{downloads}` folder).
 */
export function getMP4FilePath(title, forDownload = true) {
  if (forDownload) {
    return path.join(getStorageFolder(DEFAULT_DOWNLOAD_FOLDER), `${title}.mp4`);
  }

  return path.join(TEMP_DATA_FOLDER, `tmp_${title}.mp4`);
}

/**
 * Get the path to where we should save the MP3 file.
 * If the method is called for a temporary MP3 file,
 * the method will return the path `%APPDATA%/roaming/online video converter/Cache`.
 * Otherwise it returns the `{user selected}` folder. (Default to `{downloads}` folder).
 */
export function getMP3FilePath(title, forDownload = true) {
  if (forDownload) {
    return path.join(getStorageFolder(DEFAULT_DOWNLOAD_FOLDER), `${title}.mp3`);
  }

  return path.join(TEMP_DATA_FOLDER, `tmp_${title}.mp3`);
}

/**
 * Convert the duration string `{HH:MM:SS.ms}` into a float
 * number `{HHMM.SS}`.
 * ex: {duration: 01:05:25.12} => output: {105.25}
 *
 * @param {string} duration Video duration.
 */
export function getTimeFromDuration(duration = '00:00:00.00') {
  const value = duration.split(':');
  return parseFloat(`${value[0]}${value[1]}.${value[2]}`);
}

/**
 * Get the default object of the video.
 */
export function getDefaultVideoInfo() {
  return {
    id: '',
    title: '',
    duration: '00:00:00.00',
    link: '',
    thumbnail: '',
  };
}
