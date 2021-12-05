import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { useLocalStorage } from 'react-use';
import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './features/modal/modalSlice.js';
import { AuthContext, SocketContext } from './contexts';
import channelsSlice, { channelsActions } from './features/channels/channelsSlice';
import messagesSlice, { messagesActions } from './features/messages/messagesSlice';
import socket from './api/socket.js';
import App from './App.jsx';

const store = configureStore({
  reducer: {
    channelsInfo: channelsSlice,
    messagesInfo: messagesSlice,
    modalInfo: modalSlice,
  },
});

const AuthProvider = ({ children }) => {
  const [authData, setAuthData, removeAuthData] = useLocalStorage('user');
  const isHasToken = !!authData;
  const [isLogIn, setLogIn] = useState(isHasToken);
  const logIn = ({ username, token }) => {
    setAuthData({ username, token });
    setLogIn(true);
  };
  const logOut = () => {
    removeAuthData();
    setLogIn(false);
  };
  const auth = {
    isLogIn,
    logIn,
    logOut,
    token: authData?.token,
    username: authData?.username,
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

const maxEmitTime = 2500;
const mapSocketEventNamesToActions = {
  removeChannel: channelsActions.channelRemoved,
  renameChannel: channelsActions.channelRenamed,
  newChannel: channelsActions.channelAdded,
  newMessage: messagesActions.messageAdded,
};

const openSocketListeners = (eventsToActions) => {
  Object.entries(eventsToActions).forEach(([socketEventName, action]) => {
    socket.on(socketEventName, (data) => {
      store.dispatch(action(data));
    });
  });
};

const makeSocketEventEmitter = (socketEvent) => (payload) => (
  new Promise((resolve, reject) => {
    const withTimeout = () => {
      const timerId = setTimeout(() => {
        reject(Error('Socket timed out! Check your network connection'));
      }, maxEmitTime);

      return (response) => {
        clearTimeout(timerId);
        if (response.status === 'ok') {
          resolve('success');
        }
        reject(Error(`Socket response status: ${response.status}`));
      };
    };
    socket.volatile.emit(socketEvent, payload, withTimeout());
  }));

const SocketProvider = ({ children }) => {
  const emitters = Object.keys(mapSocketEventNamesToActions)
    .reduce((acc, socketEventName) => (
      { ...acc, [socketEventName]: makeSocketEventEmitter(socketEventName) }
    ), {});

  return (
    <SocketContext.Provider value={emitters}>
      {children}
    </SocketContext.Provider>
  );
};

const init = () => {
  openSocketListeners(mapSocketEventNamesToActions, store.dispatch);
  return (
    <Provider store={store}>
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
    </Provider>
  );
};

export default init;
