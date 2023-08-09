import useMainContext from "../../contexts/useMainContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { CREATE_CLIENT_ACCOUNT_PATH, HOME_PATH } from "../../router";
import type { XUser } from "../../types";
import MyOutlet from "../../pages/outlet/MyOutlet";
import Home from "../../pages/home/Home";
import { useEffect } from "react";

function Guardian() {
  const { netlifyIdentity } = useMainContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const user = netlifyIdentity.currentUser() as XUser;
  const companyName = user?.app_metadata?.companyName;

  

  useEffect(() => {
    if (!user && pathname !== HOME_PATH) {
      navigate(HOME_PATH);
    }

    if (user && !companyName && pathname !== CREATE_CLIENT_ACCOUNT_PATH) {
      navigate(CREATE_CLIENT_ACCOUNT_PATH);
    }
  }, [user, companyName, pathname, navigate]);
    
      

  if (!user) {
    return <Home />;
  }

  if (
    user &&
    !companyName &&
    pathname !== CREATE_CLIENT_ACCOUNT_PATH
  ) {
    return <Navigate to={CREATE_CLIENT_ACCOUNT_PATH} />;
  }

  return <MyOutlet />;
}

export default Guardian;
