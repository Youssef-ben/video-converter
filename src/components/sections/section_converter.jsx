import React from "react";
import {FormattedMessage } from "react-intl";

import {
    Button,
    InputGroup,
    FormControl
} from "react-bootstrap";

export default class SectionConverter extends React.PureComponent{
    render(){
        const title = (
          <FormattedMessage
            id="app.sections.converter.title"
            defaultMessage="<b>Please past a valid link of the [Youtube or Dailymotion] video in the box bellow to start the process.</b>"
            values={{ b: (...chunks) => <strong>{chunks}</strong> }}
          />
        );

        const placeholder = "https://www.youtube.com/watch?v=Ru3bADNFE3";

        return (
          <section className="container section-converter mb-4">
            <h5 className="text-secondary text-justify">{title}</h5>
            <InputGroup className="mb-3">
              <FormControl
                size="lg"
                type="url"
                placeholder={placeholder}
                aria-label="video url"
                aria-describedby="video-url"
              />
              <InputGroup.Append>
                <Button variant="primary" disabled>
                  Convert
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </section>
        );
    }
}