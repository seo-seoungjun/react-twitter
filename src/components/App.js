import React, { useEffect, useState } from 'react';
import AppRouters from './Router';
import { authService } from '../myBase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouters isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        'initialize,,,'
      )}
    </>
  );
}

export default App;
