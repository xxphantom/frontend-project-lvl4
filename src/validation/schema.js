import * as Yup from 'yup';

export const createChannelSchema = (channelNames, t) => Yup.object({
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

export const createNewUserSchema = (existingNames, t) => Yup.object({
  username: Yup.string()
    .required(t('validation.required'))
    .min(3, t('validation.minNameLength'))
    .max(20, t('validation.maxNameLength'))
    .notOneOf(existingNames, t('validation.alreadyHaveUser')),
  password: Yup.string()
    .required(t('validation.required'))
    .min(6, t('validation.minPasswordLength')),
  passwordConfirm: Yup.string()
    .required(t('validation.required'))
    .oneOf([Yup.ref('password')], t('validation.passwordMismatch')),
});
