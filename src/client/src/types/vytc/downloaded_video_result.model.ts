import { FileType } from './file_extensions.enum';

export type GetYoutubeFile = {
  id: string;
  key: string;
  duration: string;
  extension: string;
  type: FileType;
};
