import React from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './progress_bar.jsx';
import DetailsCard from './details_card.jsx';

export default class DetailsSection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showProgress: false,
      progress: 0,
      progressMessage: 'Fetching...',
    };
  }

  startProcess = () => {
    let { progress } = this.state;
    this.setState({ showProgress: true });

    const inter = setInterval(() => {
      this.setState({ progress: ++progress });

      if (progress === 100) {
        const { cancel } = this.props;
        clearInterval(inter);
        cancel();
      }
    }, 200);
  };

  cancel = () => {
    // Clear all the Intervals running in the current window.
    (function (w) {
      const win = w || window;
      let i = win.setInterval(function () {}, 100000);
      while (i >= 0) {
        win.clearInterval(i--);
      }
    })(/* window */);

    const { cancel } = this.props;
    cancel();
  };

  render() {
    const { showProgress, progress, progressMessage } = this.state;
    const { videoDetails } = this.props;

    return (
      <section className="container section-converter mb-2">
        {showProgress && (
          <ProgressBar progress={progress} messageText={progressMessage} />
        )}

        <DetailsCard
          videoDetails={videoDetails}
          startProcess={this.startProcess}
          cancel={this.cancel}
        />
      </section>
    );
  }
}

DetailsSection.propTypes = {
  videoDetails: PropTypes.object,
  cancel: PropTypes.func,
};
