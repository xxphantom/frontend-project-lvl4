import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useSocket } from '../../hooks';
import { selectors } from '../../redux/slices';

function RemoveChannel({ closeModal, extra, t }) {
  const { channelId } = extra;
  const socketEmit = useSocket();
  const channel = useSelector((state) => selectors.channels.byId(state, channelId));

  const deleteChannelHandler = async () => {
    try {
      await socketEmit.removeChannel({ id: channelId });
      closeModal();
      toast.success(t('modals.RemoveChannel.removed'));
    } catch (err) {
      console.error(err);
      toast.error(t('networkError'));
    }
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: deleteChannelHandler,
  });

  return (
    <>
      <p className="lead">
        {t('modals.RemoveChannel.question', { channelName: channel?.name })}
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
}

export default RemoveChannel;
