import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Button, InputGroup, FormControl } from 'react-bootstrap';

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
      showSpinner: false,
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

  startProcess = () => {
    const { inputValue } = this.state;
    const { setDetailsViewAsync } = this.props;

    // Show spinner and disable the Button.
    this.setState({ showSpinner: true, isDisabled: true });

    setDetailsViewAsync(inputValue);
  };

  render() {
    const {
      inputValue,
      isDisabled,
      isInvalid,
      isValid,
      showSpinner,
    } = this.state;

    const title = (
      <FormattedMessage
        id="app.sections.converter.title"
        defaultMessage="<b>Please past a valid link of the [Youtube or Dailymotion] video in the box bellow to start the process.</b>"
        values={{ b: (...chunks) => <strong>{chunks}</strong> }}
      />
    );

    const buttonText = (
      <FormattedMessage
        id="app.sections.converter.button.text"
        defaultMessage="MP3"
      />
    );

    const placeholder = 'https://www.youtube.com/watch?v=Ru3bADNFE3';

    return (
      <section className="container section-converter mb-4">
        <h5 className="text-secondary text-justify">{title}</h5>
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

          <InputGroup.Append>
            <Button
              variant="primary"
              disabled={isDisabled}
              onClick={this.startProcess}
            >
              {buttonText}
              {showSpinner ? <FontAwesomeIcon icon={faCog} spin /> : <></>}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </section>
    );
  }
}

UrlView.propTypes = {
  videoUrl: PropTypes.string,
  setDetailsViewAsync: PropTypes.func,
};
