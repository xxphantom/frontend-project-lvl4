import { useContext } from 'react';
import { SocketContext } from '../contexts';

const useAuth = () => {
  const auth = useContext(SocketContext);
  return auth;
};

export default useAuth;
