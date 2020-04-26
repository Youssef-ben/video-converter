import React from 'react';

// Custom Imports
import { fetchVideoInfoAsync } from '../../utils/ytdl_utils/ytdl_electron_utils';

import { getDefaultVideoInfo } from '../../utils/ytdl_utils/ytdl_helpers';

import { UrlView, VideoDetailsView } from '../../components/sections/imports';

export default class SectionConverter extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: false,
      videoDetails: getDefaultVideoInfo(),
    };

    // Bind async methods.
    this.setDetailsViewAsync = this.setDetailsViewAsync.bind(this);
  }

  async setDetailsViewAsync(url) {
    // Fetch te video details
    const details = await fetchVideoInfoAsync(url);

    this.setState({ showDetails: true, videoDetails: details });
  }

  startProcess = () => {
    this.setState({
      showDetails: false,
      videoDetails: getDefaultVideoInfo(),
    });
  };

  onCancel = () => {
    // Clear all the Intervals running in the current window.
    (function (w) {
      const win = w || window;
      let i = win.setInterval(function () {}, 100000);
      while (i >= 0) {
        win.clearInterval(i--);
      }
    })(/* window */);

    this.setState({ showDetails: false, videoDetails: getDefaultVideoInfo() });
  };

  render() {
    const { showDetails, videoDetails } = this.state;

    return (
      <>
        {!showDetails ? (
          <UrlView
            setDetailsViewAsync={this.setDetailsViewAsync}
            videoUrl={videoDetails.link}
          />
        ) : (
          <VideoDetailsView
            videoDetails={videoDetails}
            cancel={this.onCancel}
            startProcess={this.startProcess}
          />
        )}
      </>
    );
  }
}
