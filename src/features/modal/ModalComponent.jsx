import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { modalActions, selectModalInfo } from './modalSlice.js';
import useChannelValidation from '../../hooks/useChannelsValidation.js';
import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const modals = {
  AddChannel,
  RenameChannel,
  RemoveChannel,
};
const modalTitles = {
  AddChannel: 'Добавить канал',
  RenameChannel: 'Переименовать канал',
  RemoveChannel: 'Удалить канал',
};

const ModalComponent = () => {
  const dispatch = useDispatch();
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
        <Modal.Title>{modalTitles[type]}</Modal.Title>
        <Button variant="close" onClick={closeModal} />
      </Modal.Header>
      <Modal.Body>
        <Component
          validationSchema={validationSchema}
          closeModal={closeModal}
          extra={extra}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
