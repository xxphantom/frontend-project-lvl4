import AddChannel from './AddChannel.jsx';

const modals = {
  AddChannel,
};

const getModal = (modalType) => modals[modalType];

export default getModal;
