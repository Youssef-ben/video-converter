import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Button, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export default class ThumbnailDetailsView extends React.PureComponent {
  renderCardThumbnail = (videoDetails) => (
    <div className="img-block">
      <Card.Img
        variant="top"
        alt={videoDetails.title}
        src={videoDetails.thumbnail.url}
      />
      <span className="duration-time">{videoDetails.duration}</span>
    </div>
  );

  renderCardBody = (videoDetails) => (
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
  );

  renderCardFooterDownloadBtn = () => {
    const { startProcess, disableDownloadBtn } = this.props;

    const btnDownload = (
      <FormattedMessage
        id="app.sections.converter.details.download"
        defaultMessage="Download"
      />
    );

    return (
      <Button
        className="btn-block"
        size="sm"
        onClick={startProcess}
        disabled={disableDownloadBtn}
      >
        {btnDownload}

        {disableDownloadBtn ? <FontAwesomeIcon icon={faCog} spin /> : <></>}
      </Button>
    );
  };

  renderCardFooterCancelBtn = () => {
    const { cancel, disableCancelBtn } = this.props;

    const btnCancel = (
      <FormattedMessage
        id="app.sections.converter.details.cancel"
        defaultMessage="Cancel"
      />
    );

    return (
      <Button
        variant="secondary"
        className="btn-block"
        size="sm"
        onClick={cancel}
        disabled={disableCancelBtn}
      >
        {btnCancel}
      </Button>
    );
  };

  renderCardFooter = () => (
    <Card.Footer className="p-1">
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          {this.renderCardFooterDownloadBtn()}
        </Col>

        <Col xs={12} sm={6} md={6} lg={6}>
          {this.renderCardFooterCancelBtn()}
        </Col>
      </Row>
    </Card.Footer>
  );

  render() {
    const { videoDetails } = this.props;

    return (
      <Card>
        {this.renderCardThumbnail(videoDetails)}

        {this.renderCardBody(videoDetails)}

        {this.renderCardFooter()}
      </Card>
    );
  }
}

ThumbnailDetailsView.propTypes = {
  videoDetails: PropTypes.object,
  disableDownloadBtn: PropTypes.bool,
  startProcess: PropTypes.func,
  cancel: PropTypes.func,
  disableCancelBtn: PropTypes.bool,
};
