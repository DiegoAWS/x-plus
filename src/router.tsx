import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";

export const HOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const DASHBOARD_PATH = "/dashboard";


const routes = [
  {
    path: HOME_PATH,
    element: <Home />,

  },
  {
    path: LOGIN_PATH,
    element: <Login />,
  },
  {
    path: DASHBOARD_PATH,
    element: <Dashboard />,

  }
];
export const router = createBrowserRouter(
  routes.map(({ path, element }) => ({
    path,
    element,
  }))
);
