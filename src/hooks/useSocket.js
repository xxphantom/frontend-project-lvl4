import { useContext } from 'react';
import { SocketContext } from 'contexts.js';

const useAuth = () => {
  const auth = useContext(SocketContext);
  return auth;
};

export default useAuth;
