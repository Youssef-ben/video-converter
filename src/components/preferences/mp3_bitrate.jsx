import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Form, Row, Col } from 'react-bootstrap';

// Helpers
import { setMp3Bitrate, getMp3Bitrate } from '../../utils/constants';

const MP3_BITRATES = {
  HIGH_QUALITY: 320,
  GOOD_QUALITY: 191,
  CD_QUALITY: 160,
  RADIO_QUALITY: 130,
};

const MP3BitRate = () => {
  const [mp3Bitrate, setMp3BitrateState] = React.useState(getMp3Bitrate());

  const sectionTitle = (
    <FormattedMessage
      id="app.modal.preferences.storage.bitrate"
      defaultMessage="MP3 Bitrate"
    />
  );

  const fullQualityText = (
    <FormattedMessage
      id="app.modal.preferences.storage.bitrate.full"
      defaultMessage="MP3 Bitrate"
    />
  );

  const highQualityText = (
    <FormattedMessage
      id="app.modal.preferences.storage.bitrate.high"
      defaultMessage="MP3 Bitrate"
    />
  );

  const cdQualityText = (
    <FormattedMessage
      id="app.modal.preferences.storage.bitrate.cd"
      defaultMessage="MP3 Bitrate"
    />
  );

  const radioQualityText = (
    <FormattedMessage
      id="app.modal.preferences.storage.bitrate.radio"
      defaultMessage="MP3 Bitrate"
    />
  );

  const onChecked = (e) => {
    const value = parseInt(e.currentTarget.value);
    setMp3Bitrate(value);
    setMp3BitrateState(value);
  };

  return (
    <Form.Group as={Row}>
      <Form.Label as="legend" column sm={12} className="pt-0 pr-0">
        {sectionTitle}
      </Form.Label>

      <Col sm={12} className="pl-5">
        <Form.Check
          type="radio"
          id="full_quality_320"
          name="mp3Bitrate"
          value={MP3_BITRATES.HIGH_QUALITY}
          label={fullQualityText}
          checked={mp3Bitrate === MP3_BITRATES.HIGH_QUALITY}
          onChange={onChecked}
        />
        <Form.Check
          type="radio"
          id="high_quality_191"
          name="mp3Bitrate"
          value={MP3_BITRATES.GOOD_QUALITY}
          label={highQualityText}
          checked={mp3Bitrate === MP3_BITRATES.GOOD_QUALITY}
          onChange={onChecked}
        />
        <Form.Check
          type="radio"
          id="cd_quality_160"
          name="mp3Bitrate"
          value={MP3_BITRATES.CD_QUALITY}
          label={cdQualityText}
          checked={mp3Bitrate === MP3_BITRATES.CD_QUALITY}
          onChange={onChecked}
        />
        <Form.Check
          type="radio"
          id="radio_quality_130"
          name="mp3Bitrate"
          value={MP3_BITRATES.RADIO_QUALITY}
          label={radioQualityText}
          checked={mp3Bitrate === MP3_BITRATES.RADIO_QUALITY}
          onChange={onChecked}
        />
      </Col>
    </Form.Group>
  );
};

export default MP3BitRate;
