import useMainContext from "../../contexts/useMainContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { CREATE_CLIENT_ACCOUNT_PATH, HOME_PATH } from "../../router";
import type { XUser } from "../../types";
import MyOutlet from "../../pages/outlet/MyOutlet";
import Home from "../../pages/home/Home";

function Guardian() {
  const { netlifyIdentity } = useMainContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const user = netlifyIdentity.currentUser() as XUser;

  console.log({ user, pathname, navigate });

  if (!user) {
    navigate(HOME_PATH);
    return <Home />;
  }

  if (
    user &&
    !user.app_metadata?.companyName &&
    pathname !== CREATE_CLIENT_ACCOUNT_PATH
  ) {
    return <Navigate to={CREATE_CLIENT_ACCOUNT_PATH} />;
  }

  return <MyOutlet />;
}

export default Guardian;
