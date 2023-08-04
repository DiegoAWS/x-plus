import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Guardian from "./components/guardian/Guardian";

export const HOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const DASHBOARD_PATH = "/dashboard";

const routes = [
  {
    path: HOME_PATH,
    element: (
      <Guardian
        publicComponent={<Home />}
        privateComponent={<Navigate to={DASHBOARD_PATH} />}
      />
    ),
  },
  {
    path: LOGIN_PATH,
    element: (
      <Guardian
        publicComponent={<Login />}
        privateComponent={<Navigate to={DASHBOARD_PATH} />}
      />
    ),
  },
  {
    path: DASHBOARD_PATH,
    element: <Guardian privateComponent={<Dashboard />} />,
  },
];

export const router = createBrowserRouter(routes);
