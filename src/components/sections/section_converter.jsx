import React from "react";
import {FormattedMessage } from "react-intl";

import {
    Button,
    InputGroup,
    FormControl
} from "react-bootstrap";

// Custom Imports
import { isValidUrl, getVideoIdFromUrl } from "../../utils/constants";

const ytdl = window.require('ytdl-core');

export default class SectionConverter extends React.PureComponent{
    constructor(props){
      super(props);

      this.state = {
        input_value: '',
        is_disabled: true,        
        is_invalid: false,
        is_valid: false,
      };
    }

    onValueChange = (e)=>{
      const value = e.target.value;

      let state = {
        input_value: value,
        is_valid: value? true : null,
        is_invalid: false,
        is_disabled: value? false : true
      };
      
      if(!isValidUrl(value) && value){
        state.is_valid = false;
        state.is_invalid = true;
        state.is_disabled = true;
      }

      this.setState(state);
    }

    async fetchVideoDetails(vidID, url) {
      console.log("fetching...");
      try {
        let info = await ytdl.getInfo(vidID);
        console.log(info);
      } catch (error) {
        console.log(error);
      }
    }

    startProcess = () => {

      const video_id = getVideoIdFromUrl(this.state.input_value, true);
      this.fetchVideoDetails(video_id, this.state.input_value);
    }

    render(){
      const { input_value, is_disabled, is_invalid, is_valid } = this.state;

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
          defaultMessage="Convert"
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
              </Button>
            </InputGroup.Append>

          </InputGroup>
        </section>
      );
    }
}