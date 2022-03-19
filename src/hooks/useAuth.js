import { useContext } from 'react';
import { AuthContext } from 'contexts.js';

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
