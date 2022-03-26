import { useContext } from 'react';
import { ProfanityContext } from '../contexts';

const useProfanity = () => {
  const profanity = useContext(ProfanityContext);
  return profanity;
};

export default useProfanity;
