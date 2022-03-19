import * as Yup from 'yup';

export const createChannelValidationSchema = (channelNames, t) => Yup.object({
  channelName: Yup.string()
    .min(3, t('channelValidation.minLength'))
    .max(20, t('channelValidation.maxLength'))
    .required(t('channelValidation.required'))
    .notOneOf(channelNames, t('channelValidation.alreadyExists')),
});

export const createLoginSchema = (t) => Yup.object().shape({
  username: Yup.string()
    .required(t('validation.required')),
  password: Yup.string()
    .required(t('validation.required')),
});
