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

  console.log('Guardian: Current user:', user);
  useEffect(() => {
    if (!user && pathname !== HOME_PATH) {
      console.log("Guardian: User is undefined, redirecting to home...");
      navigate(HOME_PATH);
    }

    if (user && !companyName && pathname !== CREATE_CLIENT_ACCOUNT_PATH) {
      console.log("Guardian: User exists but lacks companyName, redirecting...");
      navigate(CREATE_CLIENT_ACCOUNT_PATH);
    }
  }, [user, companyName, pathname, navigate]);
    
  if (!user) {
    console.log("Guardian: Rendering Home component due to lack of user.");
    return <Home />;
  }

  if (
    user &&
    !companyName &&
    pathname !== CREATE_CLIENT_ACCOUNT_PATH
  ) {
    console.log("Guardian: Navigating due to user missing companyName.");
    return <Navigate to={CREATE_CLIENT_ACCOUNT_PATH} />;
  }

  console.log("Guardian: All checks passed, rendering MyOutlet component.");
  return <MyOutlet />;
}

export default Guardian;
