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

function convertSecondesToHMS(secondes) {
    // Convert value to number if it's string
    const sec = parseInt(secondes, 10);

    // Get hours
    let hours   = Math.floor(sec / 3600);
    
    // Get minutes
    let minutes = Math.floor((sec - (hours * 3600)) / 60);
    
    //  Get seconds
    let seconds = sec - (hours * 3600) - (minutes * 60);
    
    // add 0 if value < 10
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    
    // Return is HH : MM : SS
    return `${hours}:${minutes}:${seconds}`;
}

export {
    getVideoIdFromUrl,
    isValidUrl,
    convertSecondesToHMS,
}