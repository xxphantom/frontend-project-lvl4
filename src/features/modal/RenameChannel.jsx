import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import cn from 'classnames';
import { selectChannelById } from '../channels/channelsSlice.js';
import useSocketEmit from '../../hooks/useSocketEmit.js';

const RenameChannel = ({ closeModal, extra, validationSchema }) => {
  const socketEmit = useSocketEmit();
  const { channelId } = extra;
  const { name: oldChannelName } = useSelector((state) => selectChannelById(state, channelId));
  const inputEl = useRef();

  const renameChannelHandler = async (values, { setSubmitting }) => {
    const trimmedInput = values.channelName.trim();
    const channel = { id: channelId, name: trimmedInput };
    try {
      await socketEmit.renameChannel(channel);
      closeModal();
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      inputEl.current.select();
    }
  };

  const formik = useFormik({
    initialValues: { channelName: oldChannelName },
    validationSchema,
    onSubmit: renameChannelHandler,
  });

  useEffect(() => {
    setTimeout(() => {
      inputEl.current.select();
    }, 0);
  }, []);

  const isErrorShown = formik.touched.channelName && !formik.isValid;
  const className = cn('mb-2', { 'is-invalid': isErrorShown });
  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group controlId="channelName">
        <Form.Control
          ref={inputEl}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.channelName}
          name="channelName"
          className={className}
          type="text"
          placeholder="Введите название канала"
        />
        {isErrorShown
          ? <Form.Control.Feedback type="invalid" feedback="">{formik.errors.channelName}</Form.Control.Feedback>
          : null}
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={closeModal}>
            Отменить
          </Button>
          <Button type="submit" disabled={formik.isSubmitting} variant="primary">
            Отправить
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default RenameChannel;
