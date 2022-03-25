import React from 'react';
import Navbar from 'layout/Navbar';
import RouterConfig from 'navigation/RouterConfig.jsx';

export default function App() {
  return (
    <Navbar>
      <RouterConfig />
    </Navbar>
  );
}
