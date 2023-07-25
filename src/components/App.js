import React, { useEffect, useState } from 'react';
import AppRouters from './Router';
import { authService } from '../myBase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [init, setInit] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <AppRouters isLoggedIn={isLoggedIn} /> : 'initialize,,,'}</>;
}

export default App;
