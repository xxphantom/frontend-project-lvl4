import React, {
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emit } from '../../middlewares/socketIO';
import { selectCurrentMessages, messageAdded } from './messagesSlice';
import AuthContext from '../../contexts/authContext.js';
import { selectChannelById } from '../channels/channelsSlice';

const MessagesList = () => {
  const { username } = useContext(AuthContext);
  const [inputMessage, setInputMessage] = useState('');
  const sentMessageStatus = useSelector((state) => state.messagesInfo.sentMessageStatus);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const currentChannel = useSelector((state) => selectChannelById(state, currentChannelId));
  const messages = useSelector(selectCurrentMessages);
  const inputEl = useRef(null);
  const lastMessageEl = useRef(null);

  const dispatch = useDispatch();

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

  const isDisabled = sentMessageStatus === 'pending';

  useEffect(() => {
    lastMessageEl.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    inputEl.current.focus();
    if (sentMessageStatus === 'success') {
      inputEl.current.scrollIntoView();
      setInputMessage('');
    }
  }, [currentChannelId, sentMessageStatus]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{currentChannel?.name}</b></p>
          <span className="text-muted">
            {`${messages.length} сообщений`}
          </span>
        </div>
        <div id="messages-box" ref={lastMessageEl} className="chat-messages overflow-auto px-5 ">
          {messages.map((message, index) => {
            const ref = messages.length === (index + 1) ? lastMessageEl : null;
            return (
              <div ref={ref} key={message.id} className="text-break mb-2">
                <b>{message.username}</b>
                {': '}
                {message.body}
              </div>
            );
          })}
        </div>
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
      </div>
    </div>
  );
};
export default MessagesList;
