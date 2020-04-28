import React from 'react';
import PropTypes from 'prop-types';

export default class ProgressBarView extends React.PureComponent {
  render() {
    const { progress, messageText } = this.props;

    const percentComplete = `${progress}%`;
    const fontColor = progress > 95 ? '#F6F0E9' : '#68717a';

    return (
      <div>
        <div className="progress">
          <div
            className="progress__bar btn-primary"
            style={{ width: percentComplete }}
          />
        </div>
        <div className="center mb-2">
          <div
            className="progress__percentage"
            style={{ color: `${fontColor} !important` }}
          >
            {percentComplete}
          </div>
          <span className="progress__info">{messageText}</span>
        </div>
      </div>
    );
  }
}

ProgressBarView.propTypes = {
  progress: PropTypes.number,
  messageText: PropTypes.string,
};
