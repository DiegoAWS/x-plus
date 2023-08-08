import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { HOME_PATH } from "../../router";
import netlifyIdentity from "netlify-identity-widget";

type Props = {
  children?: React.ReactNode;
  privateComponent?: React.ReactNode;
  publicComponent?: React.ReactNode;
};
function Guardian({ children, publicComponent, privateComponent }: Props) {

  const { pathname } = useLocation();

  return netlifyIdentity.currentUser() ? (
    privateComponent || children || null
  ) : pathname === HOME_PATH ? (
    publicComponent || null
  ) : (
    <Navigate to={HOME_PATH} />
  );
}

export default Guardian;
