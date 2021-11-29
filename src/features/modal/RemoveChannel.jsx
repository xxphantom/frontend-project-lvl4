import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { selectChannelById } from '../channels/channelsSlice.js';
import useSocketEmit from '../../hooks/useSocketEmit.js';

const RemoveChannel = ({ closeModal, extra }) => {
  const { channelId } = extra;
  const socketEmit = useSocketEmit();
  const { name: channelName } = useSelector((state) => selectChannelById(state, channelId));

  const deleteChannel = async (e) => {
    e.preventDefault();
    try {
      await socketEmit.removeChannel({ id: channelId });
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <p className="lead">
        {'Удалить канал: "'}
        {channelName}
        {'"?'}
      </p>
      <div className="d-flex justify-content-end">
        <Button className="me-2" variant="secondary" onClick={closeModal}>
          Отменить
        </Button>
        <Button variant="danger" onClick={deleteChannel}>
          Удалить
        </Button>
      </div>
    </>
  );
};

export default RemoveChannel;
