import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Row, Col } from 'react-bootstrap';

const SectionPresentation = () => {
  const appName = (
    <FormattedMessage id="app.name.id" defaultMessage="Video Converter" />
  );

  const question = (
    <FormattedMessage
      id="app.sections.presentation.question"
      defaultMessage="Need to download and convert a Youtube videos in mp3 format?"
    />
  );

  const description = (
    <FormattedMessage
      id="app.sections.presentation.description"
      defaultMessage={
        'Well look no more, <b>Video Converter</b> is a free tool that allow you to convert a Youtuben videos to an mp3 file that you can save to your device.'
      }
      values={{ b: (...chunks) => <strong>{chunks}</strong> }} // eslint-disable-line react/display-name
    />
  );
  return (
    <section className="container section-prensentation mb-4">
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <h2 className=" mt-2 mb-1 text-primary">{appName}</h2>
          <h5 className="text-secondary text-justify mb-2">{question}</h5>
          <p className="text-justify">{description}</p>
        </Col>
      </Row>
    </section>
  );
};

export default SectionPresentation;
