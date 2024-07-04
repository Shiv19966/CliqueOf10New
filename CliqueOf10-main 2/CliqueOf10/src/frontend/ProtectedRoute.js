// src/components/ProtectedRoute.js
import React from "react";
// import { Route, Redirect } from "react-router-dom";
import { auth } from "../config";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    // <Route
    //   {...rest}
    //   render={(props) =>
    //     auth.currentUser ? <Component {...props} /> : <Redirect to="/login" />
    //   }
    // />
    <div></div>
  );
};

export default ProtectedRoute;
