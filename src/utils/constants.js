//eslint-disable-next-line
const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

//eslint-disable-next-line
const dailymotionRegExp = /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;

function getVideoIdFromUrl(url, isYoutubeUrl = true) {
    var result = url.match(isYoutubeUrl ? youtubeRegExp : dailymotionRegExp);

    if(!result){
        return null;
    }

    // Return the ID of the video Both Youtube and Dailymotion has the ID in the 2 index.
    return result[2];
}

function isValidUrl(url){
     // Validate Youtube or Dailymotion URL
     if (!getVideoIdFromUrl(url, true) && !getVideoIdFromUrl(url, false)) {
        return false;
     }

     return true;
}

export {
    getVideoIdFromUrl,
    isValidUrl
}