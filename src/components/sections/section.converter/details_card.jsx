import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Button, Card, Row, Col } from 'react-bootstrap';

class DetailsCard extends React.PureComponent {
  render() {
    const { videoDetails, startProcess, cancel } = this.props;

    const btnDownload = (
      <FormattedMessage
        id="app.sections.converter.details.download"
        defaultMessage="Download"
      />
    );

    const btnCancel = (
      <FormattedMessage
        id="app.sections.converter.details.cancel"
        defaultMessage="Cancel"
      />
    );

    return (
      <Card>
        <div className="img-block">
          <Card.Img
            variant="top"
            alt={videoDetails.title}
            src={videoDetails.thumbnail.url}
          />
          <span className="duration-time">{videoDetails.duration}</span>
        </div>
        <Card.Body className="p-2">
          <Card.Title
            className="mb-0"
            data-toggle="tooltip"
            data-placement="top"
            title={videoDetails.title}
          >
            {videoDetails.title}
          </Card.Title>
        </Card.Body>

        <Card.Footer className="p-1">
          <Row>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Button className="btn-block" size="sm" onClick={startProcess}>
                {btnDownload}
              </Button>
            </Col>

            <Col xs={12} sm={6} md={6} lg={6}>
              <Button
                variant="secondary"
                className="btn-block"
                size="sm"
                onClick={cancel}
              >
                {btnCancel}
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
  }
}

DetailsCard.propTypes = {
  videoDetails: PropTypes.object,
  startProcess: PropTypes.func,
  cancel: PropTypes.func,
};

export default DetailsCard;
