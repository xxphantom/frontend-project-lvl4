import { useState } from 'react';
import socket from '../api/socket.js';

const IDLE = 'idle';
export const FAILED = 'failed';
export const PENDING = 'pending';
export const SUCCESS = 'success';

const useSocket = () => {
  const [emitStatus, setEmitStatus] = useState(IDLE);

  const emit = (socketEvent, payload) => {
    setEmitStatus(PENDING);
    const withTimeout = () => {
      const timerId = setTimeout(() => {
        setEmitStatus(FAILED);
      }, 2500);
      return (response) => {
        clearTimeout(timerId);
        if (response.status !== 'ok') {
          setEmitStatus(FAILED);
          return;
        }
        setEmitStatus(SUCCESS);
      };
    };
    socket.volatile.emit(socketEvent, payload, withTimeout());
  };
  return [emitStatus, emit];
};

export default useSocket;
