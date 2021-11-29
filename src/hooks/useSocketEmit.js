import socket from '../api/socket.js';

const maxEmitTime = 2500;

const useSocket = () => {
  const makeSocketEventEmitter = (socketEvent) => (payload) => new Promise((resolve, reject) => {
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
    // todo delete timeout
    setTimeout(() => socket.volatile.emit(socketEvent, payload, withTimeout()), 100);
    // socket.volatile.emit(socketEvent, payload, withTimeout());
  });

  const emitters = {
    newMessage: makeSocketEventEmitter('newMessage'),
    newChannel: makeSocketEventEmitter('newChannel'),
    renameChannel: makeSocketEventEmitter('renameChannel'),
    removeChannel: makeSocketEventEmitter('removeChannel'),
  };

  return emitters;
};

export default useSocket;
