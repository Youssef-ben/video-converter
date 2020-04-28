import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Modal, NavDropdown } from 'react-bootstrap';

// Custom
import DefaultStorageFolder from './default_storage_folder.jsx';
import ShowDefaultStorageFolderSelector from './show_storage_folder_selector.jsx';
import MP3BitRate from './mp3_bitrate.jsx';

const PreferencesModal = () => {
  const [show, setShow] = React.useState(false);

  const title = (
    <FormattedMessage
      id="app.header.dropdown.modal.preferences.title"
      defaultMessage="Preferences"
    />
  );

  return (
    <>
      <NavDropdown.Item
        onClick={() => setShow(true)}
        className="text-secondary pt-0 pb-0"
      >
        {title}
      </NavDropdown.Item>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop={false}
        animation
        centered
      >
        <Modal.Header className="pt-2 pb-2" closeButton>
          <Modal.Title size="sm">{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <DefaultStorageFolder />
          <hr />
          <ShowDefaultStorageFolderSelector />
          <hr />
          <MP3BitRate />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PreferencesModal;
