import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Form, Row, Col, Button } from 'react-bootstrap';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

// Helpers
import { getStorageFolder } from '../../utils/constants';
import {
  DEFAULT_DOWNLOAD_FOLDER,
  selectStorageFolder,
} from '../../utils/ytdl_utils/ytdl_helpers';

const DefaultStorageFolder = () => {
  const [storageFolderPath, setStorageFolderPathState] = React.useState(
    getStorageFolder(DEFAULT_DOWNLOAD_FOLDER)
  );

  const sectionTitle = (
    <FormattedMessage
      id="app.modal.preferences.storage.selector.default"
      defaultMessage="Select default storage folder"
    />
  );

  const onClick = async () => {
    const storageFolder = await selectStorageFolder();

    setStorageFolderPathState(storageFolder);
  };

  return (
    <Form.Group as={Row} controlId="select_storage_folder">
      <Form.Label as="legend" column sm={12} className="pt-0 pr-0">
        {sectionTitle}
      </Form.Label>

      <Col sm={12} className="pl-5">
        <Row>
          <Col sm={2} className="pr-0">
            <Button
              variant="primary"
              size="sm"
              className="btn-block p-0"
              onClick={onClick}
            >
              <FontAwesomeIcon icon={faFolderOpen} />
            </Button>
          </Col>
          <Col sm={8}>
            <Form.Text className="text-muted mt-0">
              {storageFolderPath}
            </Form.Text>
          </Col>
        </Row>
      </Col>
    </Form.Group>
  );
};

export default DefaultStorageFolder;
