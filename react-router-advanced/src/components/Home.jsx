// src/components/Home.jsx

import React from 'react';
import { login, logout } from '../auth';

const Home = () => {
  return (
    <div>
      <h1>🏠 Welcome to the React Router App!</h1>
      <p>This is the landing page. Navigation is available via the links above.</p>
      <hr/>
      <h2>Authentication Control:</h2>
      <button onClick={login} style={{marginRight: '10px'}}>Log In</button>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Home;