type YoutubeThumbnail = {
  url: string;
  width: number;
  height: number;
};

// The Available Extension for each type.
type VideoExtensions = {
  audio: string;
  video: string;
};

/**
 * Youtube Video payload.
 *
 * Notes:
 * - duration: String format {00:00:00.00}.
 * - thumbnail: Video Thumbnail - Use when you want to wait for the video to load - (optional).
 * - extensions: The Available Extension for each type.
 */
export type YoutubeVideoPayload = {
  id: string;
  title: string;
  duration: string; // '00:00:00.00';
  link: string;
  extensions: VideoExtensions;
  thumbnail?: YoutubeThumbnail;
};
