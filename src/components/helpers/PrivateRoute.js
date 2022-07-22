import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {AuthorizeUser} from './AuthorizeUser';

const PrivateRoute = ({ component: Component, ...rest }) => {

  const isLoggedIn = AuthorizeUser();

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    >
    </Route>
  )
}

export default PrivateRoute