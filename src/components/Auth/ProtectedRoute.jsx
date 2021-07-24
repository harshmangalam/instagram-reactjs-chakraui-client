import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../../store/authStore";

function ProtectedRoute({ children, component: Component, ...rest }) {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
