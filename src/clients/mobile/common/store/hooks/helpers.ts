import url from 'url';

const mobileYoutubeLink = 'youtu.be';
const youtubeLink = 'youtube.com';
const validYoutubeDomains = new Set<string>([
  mobileYoutubeLink,
  youtubeLink,
  `www.${youtubeLink}`,
  `m.${youtubeLink}`,
  `music.${youtubeLink}`,
  `gaming.${youtubeLink}`,
]);

const idRegex = /^[a-zA-Z0-9-_]{11}$/;

/**
 * Validate the Youtube ID.
 *
 * @param id The id from the youtube link.
 * @returns True, if valid, False: otherwise.
 */
const isValidId = (id: string) => idRegex.test(id);

/**
 * Validate the given youtube link.
 *
 * @param link Youtube link.
 * @returns True, if valid, False, otherwise.
 */
export const isValidYoutubeUrl = (link: string): boolean => {
  try {
    const parsed = url.parse(link, true);

    // Validate the hostname
    if (!parsed.hostname || !validYoutubeDomains.has(parsed.hostname)) {
      return false;
    }

    // Extract the video id.
    // Youtube ID is only 11 chars long.
    let id = (parsed.query.v as string | null)?.substring(0, 11);

    if (!id && parsed.hostname !== mobileYoutubeLink) {
      return false;
    }

    if (!id && parsed.hostname === mobileYoutubeLink) {
      id = (parsed.path as string).substring(1, 13);
    }

    // No id was found.
    if (!id || !isValidId(id)) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
