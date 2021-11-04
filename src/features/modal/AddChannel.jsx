import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { modalActions, selectModalInfo } from './modalSlice.js';
import { selectAllChannels } from '../channels/channelsSlice.js';
import useSocketEmit, { SUCCESS } from '../../hooks/useSocketEmit.js';

const AddChannel = () => {
  const [emitStatus, emit] = useSocketEmit();
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const handleClose = () => {
    setInputValue('');
    dispatch(modalActions.closeModal());
  };
  const { isOpen } = useSelector(selectModalInfo);
  const allChannels = useSelector(selectAllChannels);

  useEffect(() => {
    if (emitStatus === SUCCESS) {
      handleClose();
    }
  }, [emitStatus]);

  const addChannelHandler = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      return;
    }
    const channel = { name: inputValue.trim() };
    const isNotUnique = allChannels.find(({ name }) => name === channel.name);
    console.dir(isNotUnique);
    if (isNotUnique) {
      return;
    }
    emit('newChannel', channel);
  };

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
        <Button variant="close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addChannelHandler}>
          <Form.Group controlId="channelName">
            <Form.Control onChange={onChangeHandler} value={inputValue} className="mb-2" type="text" placeholder="Введите название канала" />
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="secondary" onClick={handleClose}>
                Отменить
              </Button>
              <Button variant="primary" onClick={addChannelHandler}>
                Отправить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
