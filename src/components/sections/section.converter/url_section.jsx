import React from "react";
import {FormattedMessage } from "react-intl";

import {
    Button,
    InputGroup,
    FormControl
} from "react-bootstrap";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

// Custom Imports
import { isValidUrl} from "../../../utils/constants";

export default class UrlSection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = this.getDefaultState(props.video_url);
  }

  getDefaultState = (url) => {
    let state = {
      input_value: url,
      is_valid: url? true : null,
      is_invalid: false,
      is_disabled: url? false : true
    };
    
    if(!isValidUrl(url) && url) {
      state.is_valid = false;
      state.is_invalid = true;
      state.is_disabled = true;
    }

    return state;
  }

  onValueChange = (e )=> {
    const value = e.target.value.trim();

    const state = this.getDefaultState(value); 
    this.setState(state);
  }

  startProcess = () => {
      // Show spinner and disable the Button.
      this.setState({show_spinner: true, is_disabled: true});

      this.props.setDetailsViewAsync(this.state.input_value);
  }
  
  render() {
    const {
      input_value,
      is_disabled,
      is_invalid,
      is_valid,
      show_spinner,
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

    const placeholder = "https://www.youtube.com/watch?v=Ru3bADNFE3";

    return (
      <section className="container section-converter mb-4">
        <h5 className="text-secondary text-justify">{title}</h5>
        <InputGroup className="mb-3">
          <FormControl
            value={input_value}
            size="lg"
            type="url"
            placeholder={placeholder}
            aria-label="video url"
            aria-describedby="video-url"
            isInvalid={is_invalid}
            isValid={is_valid}
            onChange={this.onValueChange}
          />

          <InputGroup.Append>
            <Button
              variant="primary"
              disabled={is_disabled}
              onClick={this.startProcess}
            >
              {buttonText}
              {show_spinner ? <FontAwesomeIcon icon={faCog} spin /> : <></>}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </section>
    );
  }
}