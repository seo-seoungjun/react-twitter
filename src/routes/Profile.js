import React from 'react';
import { authService } from '../myBase';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const MyProfile = () => {
  const history = useHistory();
  const LogOut = async () => {
    await authService.signOut();
    history.push('/');
  };
  return (
    <>
      <span>My profile</span>
      <button onClick={LogOut}>LogOut</button>
    </>
  );
};

export default MyProfile;
