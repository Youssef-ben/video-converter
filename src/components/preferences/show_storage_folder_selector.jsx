import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Form, Row, Col } from 'react-bootstrap';

// Helpers
import {
  setAlwaysShowStorageFolderSeclector,
  getAlwaysShowStorageFolderSeclector,
} from '../../utils/constants';

const ShowDefaultStorageFolderSelector = () => {
  const [alwaysShow, setAlwaysShowState] = React.useState(
    getAlwaysShowStorageFolderSeclector()
  );

  const sectionTitle = (
    <FormattedMessage
      id="app.modal.preferences.storage.selector.show"
      defaultMessage="Show storage folder selector"
    />
  );

  const description = (
    <FormattedMessage
      id="app.modal.preferences.storage.selector.show.description"
      defaultMessage="If Active, the folder selector will always be shown. Otherwise, the app will use the default storage location (downloads)."
    />
  );

  const onChange = (e) => {
    setAlwaysShowStorageFolderSeclector(e.target.checked);
    setAlwaysShowState(e.target.checked);
  };

  return (
    <Form.Group as={Row} controlId="storage_folder_selector">
      <Form.Label as="legend" column sm={12} className="pt-0 pr-0">
        {sectionTitle}
      </Form.Label>

      <Col sm={12} className="pl-5">
        <Form.Check
          checked={alwaysShow}
          type="switch"
          id="always-show-storage-folder"
          label={description}
          onChange={onChange}
        />
      </Col>
    </Form.Group>
  );
};

export default ShowDefaultStorageFolderSelector;
