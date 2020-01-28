import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const user = authService.getCurrentUser();
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        if (!user)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            ></Redirect>
          );
        return Component ? <Component {...props}></Component> : render(props);
      }}
    ></Route>
  );
};

export default ProtectedRoute;
