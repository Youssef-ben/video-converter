import React from 'react';

// Custom Imports
import {
  fetchVideoDetailsAsync,
  getDefaultVideoInfos,
} from '../../utils/ytdl_utils/ytdl_electron-utils.jsx';

import UrlSection from './section.converter/url_section.jsx';
import DetailsSection from './section.converter/details_section.jsx';

export default class SectionConverter extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: false,
      videoDetails: getDefaultVideoInfos(),
    };

    // Bind async methods.
    this.setDetailsViewAsync = this.setDetailsViewAsync.bind(this);
  }

  async setDetailsViewAsync(url) {
    // Fetch te video details
    const details = await fetchVideoDetailsAsync(url);

    this.setState({ showDetails: true, videoDetails: details });
  }

  startProcess = () => {
    this.setState({
      showDetails: false,
      videoDetails: getDefaultVideoInfos(),
    });
  };

  onCancel = () => {
    this.setState({ showDetails: false });
  };

  render() {
    const { showDetails, videoDetails } = this.state;

    return (
      <>
        {!showDetails ? (
          <UrlSection
            setDetailsViewAsync={this.setDetailsViewAsync}
            videoUrl={videoDetails.link}
          />
        ) : (
          <DetailsSection
            videoDetails={videoDetails}
            cancel={this.onCancel}
            startProcess={this.startProcess}
          />
        )}
      </>
    );
  }
}
