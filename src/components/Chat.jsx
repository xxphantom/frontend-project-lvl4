// import React, { useContext } from 'react';
import React, { useEffect, useState } from 'react';
// import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// import AuthContext from '../contexts/authContext.js';
import routes from '../routes.js';

export default () => {
  const text = 'Hello, chat!';
  const userData = localStorage.getItem('user');
  const user = JSON.parse(userData);
  const token = user ? user.token : null;
  const headers = { Authorization: `Bearer ${token}` };
  const [state, setState] = useState({});

  useEffect(async () => {
    const res = await axios.get(routes.dataPath(), { headers });
    setState(res.data);
  });

  return (
    <div>{`${text} ${JSON.stringify(state)}`}</div>
  );
};
