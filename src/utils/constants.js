// eslint-disable-next-line
const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

// eslint-disable-next-line
const dailymotionRegExp = /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;

export function getVideoIdFromUrl(url, isYoutubeUrl = true) {
  const result = url.match(isYoutubeUrl ? youtubeRegExp : dailymotionRegExp);

  if (!result) {
    return null;
  }

  // Return the ID of the video Both Youtube and Dailymotion has the ID in the 2 index.
  return result[2];
}

export function isValidUrl(url) {
  // Validate Youtube or Dailymotion URL
  if (!getVideoIdFromUrl(url, true) && !getVideoIdFromUrl(url, false)) {
    return false;
  }

  return true;
}

export function convertSecondesToHMS(secondes) {
  // Convert value to number if it's string
  const sec = parseInt(secondes, 10);

  // Get hours
  let hours = Math.floor(sec / 3600);

  // Get minutes
  let minutes = Math.floor((sec - hours * 3600) / 60);

  //  Get seconds
  let seconds = sec - hours * 3600 - minutes * 60;

  // add 0 if value < 10
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // Return is HH : MM : SS
  return `${hours}:${minutes}:${seconds}`;
}

/**
 * If the value {downloadFolder} is not set in the local storage.
 * The method will set the default value with the specified `fall back` folder.
 */
export function getDownloadFolder(fallbackFolder) {
  let folder = localStorage.getItem('downloadFolder');

  if (!folder) {
    localStorage.setItem('downloadFolder', fallbackFolder);
    folder = fallbackFolder;
  }

  return folder;
}
