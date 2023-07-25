import React, { useState } from 'react';
import { authService, firebaseInstance } from '../myBase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    try {
      let provider;
      if (name === 'google') {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if (name === 'github') {
        provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      const data = await authService.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="text"
          placeholder="email"
          required
        ></input>
        <input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="password"
          required
        ></input>
        <input type="submit" value={newAccount ? 'Create account' : 'Log in'} />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Log in' : 'Create account'}
      </span>
      <button onClick={onSocialClick} name="google">
        start with google
      </button>
      <button onClick={onSocialClick} name="github">
        start with github
      </button>
    </div>
  );
};

export default Auth;
