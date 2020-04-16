import React from "react";

import {
    Button,
    Card,
    Row,
    Col
} from "react-bootstrap";

export default class DetailsSection extends React.PureComponent {
    
    render() {
        const {video_details} = this.props;

        return (
          <section className="container section-converter mb-2">
            <Card>
              <Card.Img
                variant="top"
                alt={video_details.title}
                src={video_details.thumbnail.url}
              />

              <Card.Body>
                <Card.Title>{video_details.title}</Card.Title>
              </Card.Body>

              <Card.Footer>
                  <Row>
                      <Col xs={12} sm={6} md={6} lg={6}>
                          <Button className="btn-block">Download</Button>
                      </Col>
                      <Col xs={12} sm={6} md={6} lg={6}>
                          <Button className="btn-block">Cancel</Button>
                      </Col>
                  </Row>
              </Card.Footer>
            </Card>
          </section>
        );
    }
}