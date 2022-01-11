import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { selectChannelById } from '../channels/channelsSlice.js';
import { useSocket } from '../../hooks';

const RemoveChannel = ({ closeModal, extra, t }) => {
  const { channelId } = extra;
  const socketEmit = useSocket();
  const { name: channelName } = useSelector((state) => selectChannelById(state, channelId));

  const deleteChannelHandler = async () => {
    try {
      await socketEmit.removeChannel({ id: channelId });
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: deleteChannelHandler,
  });

  return (
    <>
      <p className="lead">
        {t('modals.RemoveChannel.question', { channelName })}
      </p>
      <div className="d-flex justify-content-end">
        <Button disabled={formik.isSubmitting} className="me-2" variant="secondary" onClick={closeModal}>
          {t('modals.cancel')}
        </Button>
        <Button disabled={formik.isSubmitting} variant="danger" onClick={formik.handleSubmit}>
          {t('modals.RemoveChannel.remove')}
        </Button>
      </div>
    </>
  );
};

export default RemoveChannel;
