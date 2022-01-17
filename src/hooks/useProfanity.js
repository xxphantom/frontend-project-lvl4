import { useContext } from 'react';
import { ProfanityContext } from '../contexts/index.js';

const useProfanity = () => {
  const profanity = useContext(ProfanityContext);
  return profanity;
};

export default useProfanity;
