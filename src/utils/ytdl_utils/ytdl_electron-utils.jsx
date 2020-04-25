/**
 * Warapper helper for the {YTDL-CORE} library.
 */

import { getVideoIdFromUrl, convertSecondesToHMS } from '../constants';

const ytdl = window.require('ytdl-core');

export function getDefaultVideoInfos() {
  return {
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
      title: info.title,
      duration: convertSecondesToHMS(info.length_seconds),
      link: info.video_url,
      thumbnail: info.player_response.videoDetails.thumbnail.thumbnails[2],
    };
  } catch (error) {
    console.log(error);
  }
}
