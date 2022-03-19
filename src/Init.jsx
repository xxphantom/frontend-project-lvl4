import React from 'react';
import { Provider } from 'react-redux';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider } from 'react-i18next';
import * as profanity from 'leo-profanity';
import { actions } from 'redux/slices';
import AuthProvider from 'auth';
import store from 'redux/store.js';
import { SocketContext, ProfanityContext } from 'contexts.js';
import getI18nextInstanse from 'i18n';
import App from './App.jsx';

const maxEmitTime = 2500;
const mapSocketEventNamesToActions = {
  removeChannel: actions.channels.channelRemoved,
  renameChannel: actions.channels.channelRenamed,
  newChannel: actions.channels.channelAdded,
  newMessage: actions.messages.messageAdded,
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

const ProfanityProvider = ({ children }) => {
  profanity.loadDictionary('ru');
  return (
    <ProfanityContext.Provider value={profanity}>
      {children}
    </ProfanityContext.Provider>
  );
};

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV,
  },
};

const init = async (socket) => {
  openSocketListeners(socket, mapSocketEventNamesToActions);

  const i18nextInstanse = await getI18nextInstanse();

  return (
    <ProviderRollbar config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nextInstanse}>
            <AuthProvider>
              <SocketProvider socket={socket}>
                <ProfanityProvider>
                  <App />
                </ProfanityProvider>
              </SocketProvider>
            </AuthProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </ProviderRollbar>
  );
};

export default init;
