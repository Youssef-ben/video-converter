import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

// Custom Imports
import { isValidUrl } from '../../utils/ytdl_utils/ytdl_helpers';

export default class UrlView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = this.getDefaultState(props.videoUrl);
  }

  getDefaultState = (url) => {
    const state = {
      inputValue: url,
      isValid: url ? true : null,
      isInvalid: false,

      isDisabled: !url,
      showSpinnerMp3: false,
      showSpinnerMp4: false,
    };

    if (!isValidUrl(url) && url) {
      state.isValid = false;
      state.isInvalid = true;
      state.isDisabled = true;
    }

    return state;
  };

  onValueChange = (e) => {
    const value = e.target.value.trim();

    const state = this.getDefaultState(value);
    this.setState(state);
  };

  startProcess = (downloadAsMP4 = false) => {
    const { inputValue } = this.state;
    const { setDetailsViewAsync } = this.props;

    // Show spinner and disable the Button.
    this.setState({
      showSpinnerMp3: !downloadAsMP4,
      showSpinnerMp4: downloadAsMP4,
      isDisabled: true,
    });

    setDetailsViewAsync(inputValue, downloadAsMP4);
  };

  renderUrlInput = () => {
    const { inputValue, isInvalid, isValid } = this.state;

    const placeholder = 'https://www.youtube.com/watch?v=Ru3bADNFE3';

    return (
      <InputGroup className="mb-3">
        <FormControl
          value={inputValue}
          size="lg"
          type="url"
          placeholder={placeholder}
          aria-label="video url"
          aria-describedby="video-url"
          isInvalid={isInvalid}
          isValid={isValid}
          onChange={this.onValueChange}
        />
      </InputGroup>
    );
  };

  renderMp3Button = () => {
    const { isDisabled, showSpinnerMp3 } = this.state;

    const mp3ButtonText = (
      <FormattedMessage
        id="app.sections.converter.button.text.mp3"
        defaultMessage="Download as MP3"
      />
    );

    return (
      <Col md={6}>
        <Button
          variant="primary"
          disabled={isDisabled}
          onClick={() => this.startProcess(false)}
          className="btn-block"
        >
          {mp3ButtonText}
          {showSpinnerMp3 ? <FontAwesomeIcon icon={faCog} spin /> : <></>}
        </Button>
      </Col>
    );
  };

  renderMp4Button = () => {
    const { isDisabled, showSpinnerMp4 } = this.state;

    const mp4ButtonText = (
      <FormattedMessage
        id="app.sections.converter.button.text.mp4"
        defaultMessage="Download as MP4"
      />
    );

    return (
      <Col md={6}>
        <Button
          variant="primary"
          disabled={isDisabled}
          onClick={() => this.startProcess(true)}
          className="btn-block mp4-btn"
        >
          {mp4ButtonText}
          {showSpinnerMp4 ? <FontAwesomeIcon icon={faCog} spin /> : <></>}
        </Button>
      </Col>
    );
  };

  render() {
    const title = (
      <FormattedMessage
        id="app.sections.converter.title"
        defaultMessage="<b>Please past a valid link of the [Youtube or Dailymotion] video in the box bellow to start the process.</b>"
        values={{ b: (...chunks) => <strong>{chunks}</strong> }}
      />
    );

    return (
      <section className="container section-converter mb-4">
        <h5 className="text-secondary text-justify">{title}</h5>

        {this.renderUrlInput()}

        <Row>
          {this.renderMp3Button()}

          {this.renderMp4Button()}
        </Row>
      </section>
    );
  }
}

UrlView.propTypes = {
  videoUrl: PropTypes.string,
  setDetailsViewAsync: PropTypes.func,
};
