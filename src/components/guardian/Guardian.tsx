import React from "react";
import useMainContext from "../../contexts/useMainContext";
import { Navigate } from "react-router-dom";
import { HOME_PATH } from "../../router";

type Props = {
    children?: React.ReactNode;
    privateComponent?: React.ReactNode;
    publicComponent?: React.ReactNode;
}
function Guardian({ children, publicComponent, privateComponent }: Props) {
  const { twitterToken } = useMainContext();

  return  twitterToken ? (privateComponent|| children || null) : publicComponent || <Navigate to={HOME_PATH} />;
  
}

export default Guardian;
