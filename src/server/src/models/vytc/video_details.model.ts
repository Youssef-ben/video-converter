type YoutubeThumbnail = {
  url: string;
  width: number;
  height: number;
};

type VideoExtensions = {
  audio: string;
  video: string;
};

export type YoutubeVideoDetails = {
  id: string;
  title: string;
  duration: string; // '00:00:00.00';
  link: string;
  extensions: VideoExtensions;
  thumbnail?: YoutubeThumbnail;
};
