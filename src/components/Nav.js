import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
