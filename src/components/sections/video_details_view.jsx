import React from 'react';
import PropTypes from 'prop-types';

import ProgressBarView from './progress_bar_view.jsx';
import ThumbnailDetailsView from './thumbnail_details_view.jsx';

// Custom Imports
import {
  convertStreamToMP4Async,
  convertMP4ToMP3Async,
  removeTempFile,
} from '../../utils/ytdl_utils/ytdl_electron_utils';

import { PROGRESS_MESSAGES } from '../../utils/ytdl_utils/ytdl_helpers';

let abortController = null;

export default class VideoDetailsView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showProgress: false,
      progress: 0,
      progressMessage: PROGRESS_MESSAGES.DONLOADING,
      disableDownloadBtn: false,
    };

    // Bind method to the current class
    this.getAsMP4Async = this.getAsMP4Async.bind(this);
    this.getAsMP3Async = this.getAsMP3Async.bind(this);
    this.startConvertingToMP3Async = this.startConvertingToMP3Async.bind(this);
  }

  async getAsMP4Async(videoDetails, forDownload = false) {
    // If the abort controller if null, create new instance.
    if (!abortController) {
      abortController = new AbortController();
    }

    try {
      // Update the UI by showing the Progress bar and disabling the download buton.
      this.setState({
        showProgress: true,
        progress: 0,
        progressMessage: PROGRESS_MESSAGES.DONLOADING,
        disableDownloadBtn: true,
      });

      // Get the steam as an MP4 and return the Path to the file.
      return await convertStreamToMP4Async(
        videoDetails,
        forDownload,
        abortController.signal,

        // Callback method for updating the progress UI.
        (progress) => {
          this.updateProgressState(true, progress);
        }
      );
    } catch (error) {
      if (error.message !== 'Downloading aborted by the user.') {
        // Handle the ERRORs.
      }
    }
  }

  async getAsMP3Async(videoDetails) {
    // If the abort controller if null, create new instance.
    if (!abortController) {
      abortController = new AbortController();
    }

    // Update the UI by showing the Progress bar and disabling the download buton.
    this.setState({
      progress: 0,
      progressMessage: PROGRESS_MESSAGES.CONVERTING,
      showProgress: true,
      disableDownloadBtn: true,
    });

    try {
      return await convertMP4ToMP3Async(
        videoDetails,

        // Callback method for updating the progress UI.
        (progress) => {
          this.updateProgressState(false, progress);
        }
      );
    } catch (error) {
      if (error.message !== 'Downloading aborted by the user.') {
        // Handle the ERRORs.
      }
    }
  }

  cancel = () => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }

    const { cancel } = this.props;
    cancel();
  };

  updateProgressState = (isDownloading = true, progress) => {
    let msg = '';

    // Handle the progress-bar message for when downloading.
    if (isDownloading) {
      msg =
        progress === 100
          ? PROGRESS_MESSAGES.CONVERTING_COMPLETED
          : PROGRESS_MESSAGES.DONLOADING;
    } else {
      // Handle the progress-bar message for when converting.
      msg =
        progress === 100
          ? PROGRESS_MESSAGES.CONVERTING_COMPLETED
          : PROGRESS_MESSAGES.CONVERTING;
    }

    this.setState({ progress, progressMessage: msg });
  };

  async startConvertingToMP3Async() {
    const { videoDetails } = this.props;

    try {
      // Get the MP4 file.
      const mp4 = await this.getAsMP4Async(videoDetails);

      // TODO: Should Open the FileDialog.

      // Get the MP3 file.
      await this.getAsMP3Async(videoDetails);

      // Delete the mp4 temporary file.
      removeTempFile(mp4.path);

      // Show the finish message in the progress-bar.
      this.setState({
        progress: 100,
        progressMessage: PROGRESS_MESSAGES.COMPLETED,
      });

      // Let the user see that the conversion has finished.
      setTimeout(() => {
        this.cancel();
      }, 1300);
    } catch (error) {
      if (error.message !== 'Downloading aborted by the user.') {
        // Handle the ERRORs.
      }
    }
  }

  render() {
    const {
      showProgress,
      progress,
      progressMessage,
      disableDownloadBtn,
    } = this.state;
    const { videoDetails } = this.props;

    return (
      <section className="container section-converter mb-2">
        {showProgress && (
          <ProgressBarView progress={progress} messageText={progressMessage} />
        )}

        <ThumbnailDetailsView
          videoDetails={videoDetails}
          startProcess={this.startConvertingToMP3Async}
          cancel={this.cancel}
          disableDownloadBtn={disableDownloadBtn}
        />
      </section>
    );
  }
}

VideoDetailsView.propTypes = {
  videoDetails: PropTypes.object,
  cancel: PropTypes.func,
};
