import React from 'react';

function loop(check: boolean) {}

export default React.createContext({ 
  auth: false, 
  setAuth: loop
});