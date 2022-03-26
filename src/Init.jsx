import React from 'react';
import { Provider } from 'react-redux';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider } from 'react-i18next';
import * as profanity from 'leo-profanity';

import store from './redux/store.js';
import getI18nextInstanse from './i18n';
import { actions } from './redux/slices';
import AuthProvider from './auth/AuthProvider.jsx';
import SocketProvider from './socket/SocketProvider.jsx';
import { ProfanityContext } from './contexts';
import App from './App.jsx';

const mapSocketEventNamesToActions = {
  removeChannel: actions.channelRemoved,
  renameChannel: actions.channelRenamed,
  newChannel: actions.channelAdded,
  newMessage: actions.messageAdded,
};

const openSocketListeners = (socket, eventsToActions) => {
  Object.entries(eventsToActions).forEach(([socketEventName, action]) => {
    socket.on(socketEventName, (data) => {
      store.dispatch(action(data));
    });
  });
};

function ProfanityProvider({ children }) {
  profanity.loadDictionary('ru');
  return (
    <ProfanityContext.Provider value={profanity}>
      {children}
    </ProfanityContext.Provider>
  );
}

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
