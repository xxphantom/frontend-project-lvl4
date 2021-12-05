import { useContext } from 'react';
import { AuthContext } from '../contexts/index.js';

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
