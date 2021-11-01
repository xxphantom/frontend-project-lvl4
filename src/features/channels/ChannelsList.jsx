import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { currentChannelChanged, selectAllChannels } from './channelsSlice.js';

const ChannelsList = () => {
  const channels = useSelector(selectAllChannels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const dispatch = useDispatch();
  const changeChannelHandler = (id) => () => {
    dispatch(currentChannelChanged(id));
  };

  const btnclasses = (id) => cn(
    'w-100',
    'rounded-0',
    'text-start',
    'text-truncate',
    'btn',
    { 'btn-secondary': id === currentChannelId },
  );

  return channels.map((channel) => (
    <li key={channel.id} className="nav-item w-100">
      <button
        type="button"
        className={btnclasses(channel.id)}
        onClick={changeChannelHandler(channel.id)}
      >
        <span className="me-1">#</span>
        {channel.name}
      </button>
    </li>
  ));
};
export default ChannelsList;
