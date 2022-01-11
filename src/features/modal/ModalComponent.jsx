import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { modalActions, selectModalInfo } from './modalSlice.js';
import { useChannelValidation } from '../../hooks/index.js';
import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const modals = {
  AddChannel,
  RenameChannel,
  RemoveChannel,
};

const ModalComponent = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isOpen, type, extra } = useSelector(selectModalInfo);
  const validationSchema = useChannelValidation();

  if (!isOpen) {
    return null;
  }

  const closeModal = () => {
    dispatch(modalActions.closeModal());
  };

  const Component = modals[type];
  return (
    <Modal show={isOpen} onHide={closeModal} centered>
      <Modal.Header>
        <Modal.Title>{t(`modals.${type}.title`)}</Modal.Title>
        <Button variant="close" onClick={closeModal} />
      </Modal.Header>
      <Modal.Body>
        <Component
          validationSchema={validationSchema}
          closeModal={closeModal}
          extra={extra}
          t={t}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
