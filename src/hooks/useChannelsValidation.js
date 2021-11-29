import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { selectChannelNames } from '../features/channels/channelsSlice.js';

const createValidationSchema = (channelNames) => Yup.object({
  channelName: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Необходимо указать имя канала')
    .notOneOf(channelNames, 'Канал с таким именем уже существует'),
});

const useChannelValidation = () => {
  const channelNames = useSelector(selectChannelNames);
  const validationSchema = createValidationSchema(channelNames);
  return validationSchema;
};

export default useChannelValidation;
