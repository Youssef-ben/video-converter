import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = (props) => {
  const { title, defaultTitle } = props;

  const formattedTitle = (
    <FormattedMessage id={title} defaultMessage={defaultTitle} />
  );
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <p className="mb-5 mt-5">
              <span className="small text-secondary">
                © {new Date().getFullYear()} - {formattedTitle}
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  title: PropTypes.string,
  defaultTitle: PropTypes.string,
};

export default Footer;
