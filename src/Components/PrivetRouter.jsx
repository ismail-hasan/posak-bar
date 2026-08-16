import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";
import SpinnerLoader from "./SpinnerLoader";

const PrivetRouter = ({ children }) => {
      const { user, loading } = use(AuthContext);
      const location = useLocation();

      if (loading) {
            return <h4>loading order....</h4>
      }

      if (user) {
            return children;
      }

      return (
            <Navigate
                  to="/login"
                  state={{ from: location }}
                  replace
            />
      );
};

export default PrivetRouter;