import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { actions } from '../redux/slices';
import routes from '../routes.js';
import useAuth from './useAuth.js';

const useFetchChatData = () => {
  const { t } = useTranslation();
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { token, logOut } = useAuth();
  const headers = { Authorization: `Bearer ${token}` };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isDataFetched) {
      return;
    }
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers });
        const { messages, channels, currentChannelId } = data;
        dispatch(actions.initChannels({ channels, currentChannelId }));
        dispatch(actions.initMessages(messages));
        setIsDataFetched(true);
      } catch (err) {
        if (err.response?.status === 401) {
          logOut();
        } else if (err.isAxiosError) {
          toast.error(t('networkError'));
        } else {
          throw err;
        }
      }
    };
    fetchContent();
  }, []);

  return isDataFetched;
};

export default useFetchChatData;
