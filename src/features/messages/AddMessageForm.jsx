import React, {
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emit } from '../../middlewares/socketIO';
import { messageAdded } from './messagesSlice';
import { selectCurrentChannelId } from '../channels/channelsSlice';
import AuthContext from '../../contexts/authContext.js';

const AddMessageForm = () => {
  const { username } = useContext(AuthContext);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const sentMessageStatus = useSelector((state) => state.messagesInfo.sentMessageStatus);
  const [inputMessage, setInputMessage] = useState('');
  const dispatch = useDispatch();
  const isDisabled = sentMessageStatus === 'pending';
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
    if (sentMessageStatus === 'success') {
      setInputMessage('');
    }
  }, [currentChannelId, sentMessageStatus]);

  const inputMessageHandler = (e) => setInputMessage(e.target.value);
  const sendMessageHandler = (e) => {
    e.preventDefault();
    const message = { body: inputMessage, channelId: currentChannelId, username };
    const emitMessageAction = emit(
      'newMessage',
      messageAdded(message),
    );
    dispatch(emitMessageAction);
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate="" className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input ref={inputEl} name="body" disabled={isDisabled} data-testid="new-message" onChange={inputMessageHandler} value={inputMessage} placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" />
          <div className="input-group-append">
            <button onClick={sendMessageHandler} disabled={isDisabled} type="submit" className="btn btn-group-vertical">
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
