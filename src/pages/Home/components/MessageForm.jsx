import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { selectors } from 'redux/slices';
import { useAuth, useSocket, useProfanity } from 'hooks';

function AddMessageForm() {
  const { t } = useTranslation();
  const socketEmit = useSocket();
  const { username } = useAuth();
  const currentChannelId = useSelector(selectors.channels.currentId);
  const profanity = useProfanity();

  const inputEl = useRef(null);
  const validationSchema = Yup.object({
    message: Yup.string()
      .required()
      .max(3000),
  });

  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannelId]);

  const sendMessageHandler = async (values, { setSubmitting, resetForm }) => {
    const body = profanity.clean(values.message.trim());
    const message = { body, channelId: currentChannelId, username };
    try {
      await socketEmit.newMessage(message);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error(t('networkError'));
    }
    setSubmitting(false);
    inputEl.current.focus();
  };

  const formik = useFormik({
    initialValues: { message: '' },
    validationSchema,
    onSubmit: sendMessageHandler,
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
        <InputGroup className="has-validation">
          <Form.Control
            ref={inputEl}
            name="message"
            data-testid="new-message"
            disabled={formik.isSubmitting}
            onChange={formik.handleChange}
            value={formik.values.message}
            placeholder={t('messageForm.placeholder')}
            className="border-0 p-0 ps-2"
          />
          <InputGroup.Append>
            <Button variant="Link" disabled={!formik.isValid || formik.isSubmitting} type="submit" className="btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">{t('messageForm.sendMessage')}</span>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  );
}

export default AddMessageForm;
