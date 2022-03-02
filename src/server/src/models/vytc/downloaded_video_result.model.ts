import { FileType } from './file_extensions.enum';
import { FileQuality } from './file_quality.enum';

export type GetYoutubeFile = {
  id: string;
  key: string;
  duration: string;
  extension: string;
  type: FileType;
  quality: FileQuality;
};
