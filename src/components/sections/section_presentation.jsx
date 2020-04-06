import React from "react";
import {FormattedMessage } from "react-intl";

import {
    Row,
    Col
} from "react-bootstrap";

const SectionPresentation= props => {
    const appName = (
        <FormattedMessage 
            id={"app.name.id"}
            defaultMessage={"Video Converter"}
        />
    )

    const question = (
        <FormattedMessage 
            id={"app.sections.presentation.question"}
            defaultMessage={"Need to download and convert [Youtube or Dailymotion] videos in mp3 format?"}
        />
    )

    const description = (
        <FormattedMessage 
            id={"app.sections.presentation.description"}
            defaultMessage={"Well look no more, <b>Video Converter</b> is a free tool that allow you to convert a [Youtube or Dailymotion] videos to an mp3 file that you can save to your device."}
            values={{ b: (...chunks) => <strong>{chunks}</strong> }}
        />
    )
    return (
      <section className="container mb-4">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h2 className=" mt-2 mb-1 text-primary">{appName}</h2>
            <h5 className="text-secondary">{question}</h5>
            <p>{description}</p>
          </Col>
        </Row>
      </section>
    );
};

export default SectionPresentation;