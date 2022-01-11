import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectChannelNames } from '../features/channels/channelsSlice.js';

const useChannelValidation = () => {
  const { t } = useTranslation();

  const createValidationSchema = (channelNames) => Yup.object({
    channelName: Yup.string()
      .min(3, t('channelValidation.minLength'))
      .max(20, t('channelValidation.maxLength'))
      .required(t('channelValidation.required'))
      .notOneOf(channelNames, t('channelValidation.alreadyExists')),
  });

  const channelNames = useSelector(selectChannelNames);
  const validationSchema = createValidationSchema(channelNames);
  return validationSchema;
};

export default useChannelValidation;
