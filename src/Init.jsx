import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { useLocalStorage } from 'react-use';
import { configureStore } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import modalSlice from './features/modal/modalSlice.js';
import { AuthContext, SocketContext } from './contexts';
import channelsSlice, { channelsActions } from './features/channels/channelsSlice';
import messagesSlice, { messagesActions } from './features/messages/messagesSlice';
import resources from './locales';
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

const makeSocketEventEmitter = (socket, socketEvent) => (payload) => (
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

const SocketProvider = ({ socket, children }) => {
  const emitters = Object.keys(mapSocketEventNamesToActions)
    .reduce((acc, socketEventName) => (
      { ...acc, [socketEventName]: makeSocketEventEmitter(socket, socketEventName) }
    ), {});

  return (
    <SocketContext.Provider value={emitters}>
      {children}
    </SocketContext.Provider>
  );
};

const openSocketListeners = (socket, eventsToActions) => {
  Object.entries(eventsToActions).forEach(([socketEventName, action]) => {
    socket.on(socketEventName, (data) => {
      store.dispatch(action(data));
    });
  });
};

const init = async (socket) => {
  openSocketListeners(socket, mapSocketEventNamesToActions);

  const i18nextInstanse = i18n.createInstance();
  await i18nextInstanse.use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nextInstanse}>
        <AuthProvider>
          <SocketProvider socket={socket}>
            <App />
          </SocketProvider>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
