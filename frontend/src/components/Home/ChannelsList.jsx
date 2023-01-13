import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonGroup, Dropdown, Button, DropdownButton,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { actions, selectors } from '../../redux/slices';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector(selectors.channels.all);
  const currentChannelId = useSelector(selectors.channels.currentId);

  const handleShowModal = (modalType, extra = null) => dispatch(
    actions.openModal({ modalType, extra }),
  );

  const changeChannelHandler = (id) => () => {
    dispatch(actions.currentChannelChanged(id));
  };

  const dropDownButtons = (channelId, variant) => (
    <DropdownButton
      variant={variant}
      as={ButtonGroup}
      title={<span className="visually-hidden">{t('channelsList.manageChannel')}</span>}
      id="bg-nested-dropdown"
    >
      <Dropdown.Item onClick={() => handleShowModal('RenameChannel', { channelId })} eventKey="1">{t('channelsList.renameChannel')}</Dropdown.Item>
      <Dropdown.Item onClick={() => handleShowModal('RemoveChannel', { channelId })} eventKey="2">{t('channelsList.deleteChannel')}</Dropdown.Item>
    </DropdownButton>
  );

  const renderChannel = (channel) => {
    const isCurrent = channel.id === currentChannelId;
    const variant = isCurrent ? 'secondary' : 'light';
    return (
      <li key={channel.id} className="nav-item w-100">
        <ButtonGroup className="d-flex">
          <Button
            variant={variant}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={changeChannelHandler(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          {channel.removable ? dropDownButtons(channel.id, variant) : null}
        </ButtonGroup>
      </li>
    );
  };

  return (
    <div className="col-4 col-md-3 col-lg-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channelsList.channels')}</span>
        <button type="button" onClick={() => handleShowModal('AddChannel')} className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels ? channels.map(renderChannel) : null }
      </ul>
    </div>
  );
};
export default ChannelsList;
