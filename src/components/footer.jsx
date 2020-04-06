import React from "react";
import {FormattedMessage} from "react-intl";
import {
    Container,
    Row, 
    Col
  } from "react-bootstrap"

const Footer = props => {
    const title = (
      <FormattedMessage id={props.title} defaultMessage={props.defaultTitle} />
    );
    return (
        <footer className="footer">
            <Container>
            <Row>
                <Col md={12} className="text-center">
                <p className="mb-5 mt-5">
                    <span className="small">© {new Date().getFullYear()} - {title}</span>
                </p>
                </Col>
            </Row>
            </Container>
        </footer>
    );
}

export default Footer;