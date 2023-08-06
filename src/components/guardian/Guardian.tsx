import React from "react";
import useMainContext from "../../contexts/useMainContext";
import { Navigate, useLocation } from "react-router-dom";
import { HOME_PATH } from "../../router";

type Props = {
  children?: React.ReactNode;
  privateComponent?: React.ReactNode;
  publicComponent?: React.ReactNode;
};
function Guardian({ children, publicComponent, privateComponent }: Props) {
  const { twitterToken } = useMainContext();

  const { pathname } = useLocation();

  return twitterToken ? (
    privateComponent || children || null
  ) : pathname === HOME_PATH ? (
    publicComponent || null
  ) : (
    <Navigate to={HOME_PATH} />
  );
}

export default Guardian;
