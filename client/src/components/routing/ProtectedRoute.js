import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  accessType,
  ...rest
}) =>
  accessType === "guest" ? (
    // Guest only routes redirect to bookstack
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  ) : (
    // Private routes redirect to sign in
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Redirect to="/sign/in" />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );

export default ProtectedRoute;
