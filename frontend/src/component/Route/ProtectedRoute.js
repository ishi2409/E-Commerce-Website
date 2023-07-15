import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {Route, useNavigate } from "react-router-dom";
import Profile from "../User/Profile";


const ProtectedRoute = (props) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <Fragment>
      {/* {loading === false && (
        <Route 
        //   {...rest}
        //   render={(props) => {
        //       if (isAuthenticated === false) {
        //         navigate("/login");
        //     }
        // //    if (isAdmin === true && user.role !== "admin") {
        // //         navigate("/login");
        // //     }
        //     return <Element {...props} />;
        //   }}
        />
      )} */}
    </Fragment>
  );
};

export default ProtectedRoute;