import React from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './progress_bar.jsx';
import DetailsCard from './details_card.jsx';

// Custom Imports
import {
  downloadAsMP4Async,
  convertToMP3Async,
  removeTempFile,
  PROGRESS_MESSAGES,
} from '../../../utils/ytdl_utils/ytdl_electron-utils.jsx';

let abortController = null;

export default class DetailsSection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showProgress: false,
      progress: 0,
      progressMessage: PROGRESS_MESSAGES.DONLOADING,
      disableDownloadBtn: false,
    };

    // Bind method to the current class
    this.startConvertionProcess = this.startConvertionProcess.bind(this);
  }

  cancel = () => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }

    // Let the user see that the conversion has finished.
    const { cancel } = this.props;
    cancel();
  };

  updateProgressState = (isDownloading = true, progress) => {
    let msg = '';
    // Handle progress bar message for when downloading.
    if (isDownloading) {
      msg =
        progress === 100
          ? PROGRESS_MESSAGES.CONVERTING_COMPLETED
          : PROGRESS_MESSAGES.DONLOADING;
    } else {
      // Handle progress bar message for when converting.
      msg =
        progress === 100
          ? PROGRESS_MESSAGES.CONVERTING_COMPLETED
          : PROGRESS_MESSAGES.CONVERTING;
    }

    this.setState({ progress, progressMessage: msg });
  };

  async startConvertionProcess() {
    const { videoDetails } = this.props;
    abortController = new AbortController();

    // Update the UI by showing the Progress bar.
    this.setState({
      showProgress: true,
      progress: 0,
      progressMessage: PROGRESS_MESSAGES.DONLOADING,
      disableDownloadBtn: true,
    });

    try {
      // Start downloading the video as an MP4.
      const downLoadedMP4 = await downloadAsMP4Async(
        videoDetails,
        false,
        abortController.signal,

        // Callback method for updating the progress UI.
        (progress) => {
          this.updateProgressState(true, progress);
        }
      );

      // Start Converting the video to MP3
      // TODO: Should Open the FileDialog.
      this.setState({
        progress: 0,
        progressMessage: PROGRESS_MESSAGES.CONVERTING,
      });

      await convertToMP3Async(
        videoDetails,
        downLoadedMP4.path,
        '',

        // Callback method for updating the progress UI.
        (progress) => {
          this.updateProgressState(false, progress);
        }
      );

      // Delete the temp file and show the finish progress.
      setTimeout(() => {
        removeTempFile(downLoadedMP4.path);

        this.setState({
          progress: 100,
          progressMessage: PROGRESS_MESSAGES.COMPLETED,
        });

        // Let the user see that the conversion has finished.
        setTimeout(() => {
          this.cancel();
        }, 1000);
      }, 1000);
    } catch (error) {
      if (error.message !== 'Downloading aborted by the user.') {
        // Handle the ERROR by sett
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
          <ProgressBar progress={progress} messageText={progressMessage} />
        )}

        <DetailsCard
          videoDetails={videoDetails}
          startProcess={this.startConvertionProcess}
          cancel={this.cancel}
          disableDownloadBtn={disableDownloadBtn}
        />
      </section>
    );
  }
}

DetailsSection.propTypes = {
  videoDetails: PropTypes.object,
  cancel: PropTypes.func,
};
