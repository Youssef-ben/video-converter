import React from "react";

// Custom Imports
import { fetchVideoDetailsAsync, getDefaultVideoInfos } from "../../utils/ytdl_utils/ytdl_electron-utils.jsx";

import UrlSection from "./section.converter/url_section.jsx";
import DetailsSection from "./section.converter/details_section.jsx";

export default class SectionConverter extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      showDetails: false,
      video_details: getDefaultVideoInfos(),
    };

    // Bind async methods.
    this.setDetailsViewAsync = this.setDetailsViewAsync.bind(
      this
    );
  }
  
  async setDetailsViewAsync(url) {
    // Fetch te video details
    const details = await fetchVideoDetailsAsync(url);

    console.log(details);

    this.setState({ showDetails: true, video_details: details});
  }

  startProcess = () => {
    
    this.setState({ showDetails: false, video_details: getDefaultVideoInfos()});
  }

  onCancel = () => {
    this.setState({ showDetails: false});
  }

  render() {
    const {showDetails, video_details} = this.state;

    return (
      <>
        {!showDetails ? (
          <UrlSection
            setDetailsViewAsync={this.setDetailsViewAsync}
            video_url={video_details.link}
          />
        ) : (
          <DetailsSection
            video_details={video_details}
            cancel={this.onCancel}
            startProcess={this.startProcess}
          />
        )}
      </>
    );
  }
}