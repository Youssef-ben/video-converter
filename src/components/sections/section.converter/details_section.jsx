import React from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './progress_bar.jsx';
import DetailsCard from './details_card.jsx';

// Custom Imports
import {
  downloadAsMP4Async,
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
          ? PROGRESS_MESSAGES.CONVERTING
          : PROGRESS_MESSAGES.CONVERTING_COMPLETED;
    }

    this.setState({ progress, progressMessage: msg });
  };

  async startConvertionProcess() {
    const { videoDetails } = this.props;

    // Update the UI by showing the Progress bar.
    this.setState({
      showProgress: true,
      progress: 0,
      progressMessage: PROGRESS_MESSAGES.DONLOADING,
      disableDownloadBtn: true,
    });

    abortController = new AbortController();

    try {
      // Start downloading the video.
      const downLoadedMP4 = await downloadAsMP4Async(
        videoDetails,
        false,

        // Callback method for updating the progress UI.
        (progress) => {
          this.updateProgressState(true, progress);
        },

        abortController.signal
      );

      console.log(downLoadedMP4);

      // Start Converting the video to MP3
      // TODO: Should Open the FileDialog.
      this.setState({
        progress: 0,
        progressMessage: PROGRESS_MESSAGES.CONVERTING,
      });
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
