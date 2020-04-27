/**
 * Convert the video duration from secondes to `{HH:MM:SS}`.
 * @param {int} secondes The video duration in secondes.
 */
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
 * If the value `{storage_folder}` is not set in the application localStorage.
 * The method will set the default value with the specified `fallback` folder value.
 *
 * @param {string} fallbackFolder fallback folder path.
 */
export function getStorageFolder(fallbackFolder) {
  let folder = localStorage.getItem('storage_folder');

  if (!folder) {
    localStorage.setItem('storage_folder', fallbackFolder);
    folder = fallbackFolder;
  }

  return folder;
}

/**
 * Set the specified path to the application LocalStorage.
 * If the `{folderPath}` value is null, save the fallback path instead.
 *
 * @param {string} folderPath Path for the storage folder.
 * @param {string} fallbackfolder Facllback path for the storage folder.
 */
export function setStorageFolder(folderPath, fallbackfolder) {
  localStorage.setItem('storage_folder', folderPath || fallbackfolder);
  return folderPath;
}
