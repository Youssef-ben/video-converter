const validQueryDomains = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'gaming.youtube.com']);
const validPathDomains = /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/;
const idRegex = /^[a-zA-Z0-9-_]{11}$/;

/**
 * Validate the Youtube ID.
 *
 * NOTE: Taken from the {ytdl-core}
 *
 * @param id The id from the youtube link.
 * @returns True, if valid, False: otherwise.
 */
const validateID = (id: string) => idRegex.test(id);

/**
 * Validate the given youtube link.
 *
 * NOTE: Taken from the {ytdl-core}
 *
 * @param link Youtube link.
 * @returns True, if valid, False, otherwise.
 */
export const isValidYoutubeUrl = (link: string): boolean => {
  let parsed: URL;
  try {
    parsed = new URL(link);
  } catch (error) {
    return false;
  }

  let id = parsed.searchParams.get('v');

  if (validPathDomains.test(link) && !id) {
    const paths = parsed.pathname.split('/');
    id = parsed.host === 'youtu.be' ? paths[1] : paths[2];
  } else if (parsed.hostname && !validQueryDomains.has(parsed.hostname)) {
    return false;
  }

  if (!id) {
    return false;
  }

  id = id.substring(0, 11);
  if (!validateID(id)) {
    return false;
  }

  return true;
};
