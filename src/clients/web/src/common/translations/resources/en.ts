/* eslint-disable import/no-anonymous-default-export */
export default {
  translation: {
    // Common
    'app.loading': 'Loading...',
    'app.convert': 'DOWNLOAD AS',
    'app.convert.audio': 'AUDIO',
    'app.convert.video': 'VIDEO',
    'app.auto_download': 'Your download will start automatically, please wait...',
    'btn.cancel': 'Cancel',
    'btn.finish': 'Finish',

    // Header
    'app.title': 'VYTC',
    'app.title.extras': '- Videos and Youtube Converter',

    // App Errors
    'app.err.unhandled': 'Unhandled error!',
    'app.err.unhandled_desc': 'An error occurred while trying to handle your request!',
    'app.err.unhandled_reload': 'Please reload the page.',
    'app.err.unhandled_contact_team': 'If the problem persists, please contact the team.',
    'app.err.invalid_passphrase': 'Invalid passphrase!',
    'api.err.security.invalid_passphrase': 'Invalid passphrase!',
    'app.err.invalid_passphrase_desc': 'Please check that you specified a valid passphrase and try again!',
    'api.err.security.invalid_passphrase_desc': 'Please check that you specified a valid passphrase and try again!',

    // Login page
    'app.login.password': 'Password...',
    'app.login.btn': 'Login',
    'app.login.err.password_required': 'The password is required, please specify a valid value!',
    'api.login.err.invalid_credentials': 'Invalid password!',

    // Youtube downloader page
    'app.yt.title': 'Youtube Downloader',
    'app.yt.btn.search': 'Search',
    'app.yt.video_lookup.description':
      'Download any youtube video as an audio or video format. All you need to do is copy the link in the box bellow.',
    'app.yt.video_preview.description': "Hooray!! we found the video you're looking for. Please choose the file format you want to download.",
    'app.yt.video_preview.title_name': '(Optional) - Use the box below to rename the video.',
    'app.yt.err.invalid_url_msg': 'The url you entered is invalid, please re-try with a valid value!',
    'app.yt.video_preview.video_quality': 'Video Quality',
    'app.highest': 'Highest',
    'app.default': 'Medium',
    'app.lowest': 'Lowest',

    // Not Found page
    'app.page.not_found.title': 'Oh no!!',
    'app.page.not_found.subtitle': 'You’re either misspelling the URL or ',
    'app.page.not_found.subtitle_2': 'requesting a page that’s no longer exits.',
    'app.page.not_found.back_btn': 'Home page',

    // Server Messages/Error.
    'api.err.security.unauthorized': 'Unauthorized',
    'api.err.security.unauthorized_desc': "Invalid credentials or you don't have permission to access the requested resources!",

    'api.err.downloader.invalid_url': 'Invalid Youtube URL!',
    'api.err.downloader.invalid_url_desc': 'Please review the Youtube URL and try again!',

    'ws.downloading': 'Preparing...',
    'ws.success': 'Success',
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
  },
};
