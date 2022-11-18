import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';

type NavigationProps = {
  onLogout: () => void;
};

const Navigation = (props: NavigationProps) => {
  const ctx = useContext(AuthContext)
  return (
    // <AuthContext.Consumer>
      // {(ctx) => {
        // return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        // );
      // }}
    // </AuthContext.Consumer>
  );
};

export default Navigation;
