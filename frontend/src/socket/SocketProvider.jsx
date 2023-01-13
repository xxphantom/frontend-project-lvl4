import React, { useMemo } from 'react';
import { SocketContext } from '../contexts';

const maxEmitTime = 2500;
const socketEvents = [
  'removeChannel',
  'renameChannel',
  'newChannel',
  'newMessage',
];

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
  const socketEmitters = useMemo(() => socketEvents.reduce((acc, eventName) => {
    const emitter = makeSocketEventEmitter(socket, eventName);
    return { ...acc, [eventName]: emitter };
  }, {}), [socket]);

  return (
    <SocketContext.Provider value={socketEmitters}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
