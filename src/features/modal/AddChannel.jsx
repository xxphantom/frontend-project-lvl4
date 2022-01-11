import React, { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import cn from 'classnames';
import { useSocket } from '../../hooks';

const AddChannel = ({ closeModal, validationSchema, t }) => {
  const inputEl = useRef();
  const emit = useSocket();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const addChannelHandler = async (values, { setSubmitting }) => {
    const channel = { name: values.channelName.trim() };
    try {
      await emit.newChannel(channel);
      closeModal();
    } catch (err) {
      console.error(err.message);
      setSubmitting(false);
      inputEl.current.select();
    }
  };

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema,
    onSubmit: addChannelHandler,
  });

  const isErrorShown = formik.touched.channelName && !formik.isValid;
  const className = cn('mb-2', { 'is-invalid': isErrorShown });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group controlId="channelName">
        <Form.Control
          ref={inputEl}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.onBlur}
          value={formik.values.channelName}
          name="channelName"
          className={className}
          type="text"
          placeholder={t('modals.inputChannelName')}
        />
        {isErrorShown
          ? <Form.Control.Feedback type="invalid" feedback="">{formik.errors.channelName}</Form.Control.Feedback>
          : null}
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={closeModal}>
            {t('modals.cancel')}
          </Button>
          <Button type="submit" disabled={formik.isSubmitting} variant="primary">
            {t('modals.send')}
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default AddChannel;
