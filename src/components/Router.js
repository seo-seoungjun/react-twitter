import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom/cjs/react-router-dom.min';
import Home from '../routes/Home';
import Auth from '../routes/Auth';
import Nav from './Nav';
import MyProfile from '../routes/Profile';

const AppRouters = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Nav />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <MyProfile />
            </Route>
            <Redirect from="*" to="/" />
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouters;
