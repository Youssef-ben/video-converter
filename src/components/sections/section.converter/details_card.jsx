import React from 'react';
import { FormattedMessage } from "react-intl";

import {
    Button,
    Card,
    Row,
    Col
} from "react-bootstrap";

export default class DetailsCard extends React.PureComponent {
    render () { 
        const { video_details } = this.props;   
        
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
                alt={video_details.title}
                src={video_details.thumbnail.url}
              />
              <span className="duration-time">{video_details.duration}</span>
            </div>
            <Card.Body className="p-2">
              <Card.Title
                className="mb-0"
                data-toggle="tooltip"
                data-placement="top"
                title={video_details.title}
              >
                {video_details.title}
              </Card.Title>
            </Card.Body>

            <Card.Footer className="p-1">
              <Row>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <Button
                    className="btn-block"
                    size="sm"
                    onClick={this.props.startProcess}
                  >
                    {btnDownload}
                  </Button>
                </Col>

                <Col xs={12} sm={6} md={6} lg={6}>
                  <Button
                    variant="secondary"
                    className="btn-block"
                    size="sm"
                    onClick={this.props.cancel}
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