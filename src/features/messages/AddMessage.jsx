import React, {
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import _truncate from 'lodash/truncate';
import { selectCurrentChannelId } from '../channels/channelsSlice';
import AuthContext from '../../contexts/authContext.js';
import useSocketEmit, { PENDING, SUCCESS } from '../../hooks/useSocketEmit.js';

const maxMessageLength = 1000;

const AddMessageForm = () => {
  const [emitStatus, emit] = useSocketEmit();
  const { username } = useContext(AuthContext);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const [inputMessage, setInputMessage] = useState('');
  const isBlocked = emitStatus === PENDING;
  const shortenedMessage = _truncate(inputMessage, {
    length: maxMessageLength,
    separator: /,? +/,
  }).trim();
  const isDisabled = !shortenedMessage;
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
    if (emitStatus === SUCCESS) {
      setInputMessage('');
    }
  }, [currentChannelId, emitStatus]);

  const inputMessageHandler = (e) => setInputMessage(e.target.value);
  const sendMessageHandler = (e) => {
    e.preventDefault();
    const message = { body: shortenedMessage, channelId: currentChannelId, username };
    emit('newMessage', message);
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate="" className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input ref={inputEl} name="body" disabled={isBlocked} data-testid="new-message" onChange={inputMessageHandler} value={inputMessage} placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" />
          <div className="input-group-append">
            <button onClick={sendMessageHandler} disabled={isBlocked || isDisabled} type="submit" className="btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">Отправить</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMessageForm;
