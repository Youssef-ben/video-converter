/* eslint-disable import/no-anonymous-default-export */
export default {
  translation: {
    // Headers
    'app.title': 'VYTC',
    'app.title.extras': '- Videos and Youtube Converter',

    // Login page
    'app.login.btn': 'Login',
    'app.login.placeholder.password': 'Password...',
    'app.login.err.password_required': 'The password is required, please specify a valid value!',

    // Lookup page
    'app.lookup.btn': 'Search',
    'app.lookup.description': 'Download any youtube video as an audio or video format. All you need to do is copy the link in the box bellow.',
    'app.lookup.err.value_required': 'Invalid Entry, Please specify a Youtube URL and try again!',
    'app.lookup.err.invalid_url': "The url you've entered is invalid, please re-try with a valid value!",

    // Download Page
    'app.download.header.popup.video.title': 'Title',
    'app.download.header.video_quality': 'Quality',
    'app.download.header.video_quality.highest': 'Highest',
    'app.download.header.video_quality.default': 'Medium',
    'app.download.header.video_quality.lowest': 'Lowest',
    'app.download.header.popup.video_quality.label': 'The higher the quality, the longer it will take to convert and download!',

    'app.download.convert': 'DOWNLOAD AS',
    'app.download.convert.audio': 'AUDIO',
    'app.download.convert.video': 'VIDEO',

    'app.download.progress.btn': 'Cancel',

    'app.download.download': 'Your download will start automatically, please wait...',
    'app.download.download.btn': 'Finish',

    // Not Found page
    'app.page.not_found.title': 'Oh no!!',
    'app.page.not_found.subtitle': 'You’re either misspelling the URL or ',
    'app.page.not_found.subtitle_2': 'requesting a page that’s no longer exits.',
    'app.page.not_found.back_btn': 'Home page',

    // Websocket - From Server
    'ws.downloading': 'Preparing...',
    'ws.success': 'Success',

    'ws.err.connection_error': "Connection Error. Couldn't connect to the the server, please wait and try to connect again!",
    'ws.err.connection_closed': 'Disconnected. The Connection expired or the server closed the connection, please wait and try to connect again!',
    'ws.err.connection_lost': 'The connection to the server was lost, trying to reconnect...',
    'ws.err.fields_required': 'One or more fields are required!',

    'ws.fetching.video': 'Fetching the video from youtube...',
    'ws.fetching.details': 'Fetching the video details...',
    'ws.err.fetching.unexpected_error': 'An error occurred while downloading the video. Please refresh the page and try again.',

    'ws.converting': 'Converting...',
    'ws.err.converting': 'An error occurred while converting the video. Please refresh the page and try again.',

    'ws.setting_up_file': 'Setting up the files...',
    'ws.err.setting_up_file': 'An error occurred while setting up the files. Please refresh the page and try again.',

    'ws.saving': 'Saving...',
    'ws.err.unhandled': 'Unhandled error!',
    'ws.err.unhandled_desc': 'An error occurred while trying to handle your request!',

    // App Errors
    'app.err.unhandled_error.title': 'Unhandled error!',
    'app.err.unhandled_error.desc':
      'An error occurred while trying to handle your request. Please reload the page and if the problem persists, contact the team!',

    // Api Errors
    'api.err.security.invalid_passphrase': 'Invalid password!',
    'api.err.worker.invalid_url': "The url you've entered is invalid, please re-try with a valid value!",
    'api.err.validation': 'Invalid password, Please check that you specified a valid passphrase and try again!',
    'api.err.unexpected_error':
      'An error occurred while trying to handle your request. Please reload the page and if the problem persists, contact the team!',
  },
};
