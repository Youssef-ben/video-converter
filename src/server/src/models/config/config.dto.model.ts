/**
 * Data Transfer object for the config controller.
 */
export type ConfigDTO = {
  version: string;
  releaseDate: string;

  name: string;
  description: string;
  copyright?: string;
};
