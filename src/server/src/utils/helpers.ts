import { mkdirSync, existsSync } from 'fs-extra';
import { join } from 'path';
import { FileType } from '../models/vytc/file_extensions.enum';
import { FileQuality } from '../models/vytc/file_quality.enum';
import { SERVER_TEMP_FOLDER } from './constants';

export function getFileFolder(key: string): string {
  const baseFolder = join(SERVER_TEMP_FOLDER, key);
  if (!existsSync(baseFolder)) mkdirSync(baseFolder);
  return baseFolder;
}

export function getFileTemporaryPath(key: string, type: string, extension: 'mp3' | 'mp4' | string): string {
  const name = type === FileType.AUDIO_ONLY ? 'audio' : 'video';
  return join(getFileFolder(key), `${name}.${extension}`);
}

export function getFilePath(key: string, container: 'mp3' | 'mp4'): string {
  return join(`${getFileFolder(key)}/${key}.${container}`);
}

export function convertDurationToTime(duration = '00:00:00.00'): number {
  const value = duration.split(':');
  return parseFloat(`${value[0]}${value[1]}.${value[2]}`);
}

/**
 * Convert the video duration from secondes to `{HH:MM:SS}`.
 *
 * @param {int} secondes The video duration in secondes.
 */
export function convertSecondesToHMS(secondes: string): string {
  // Convert value to number if it's string
  const sec = parseInt(secondes, 10);

  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - hours * 3600) / 60);
  const seconds = sec - hours * 3600 - minutes * 60;

  // Return is HH : MM : SS
  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function getFileQuality(type: FileType, quality: FileQuality): string {
  switch (quality) {
    case FileQuality.HIGHEST:
    case FileQuality.LOWEST:
      return `${quality.toLowerCase()}${type.toLowerCase()}`;

    case FileQuality.DEFAULT:
    default:
      return FileQuality.HIGHEST;
  }
}

export function dateDiffInMinutes(date: Date): number {
  const diff = (new Date().getTime() - date.getTime()) / 1000;

  return Math.abs(Math.round(diff / 60));
}
