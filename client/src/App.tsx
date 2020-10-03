import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import AuthAPI from './context/auth.api';

const App: React.FC = () => {
  const [ auth, setAuth ] = useState(false);

  return (
    <AuthAPI.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes />
      </Router>
    </AuthAPI.Provider>
  );
};

export default App;