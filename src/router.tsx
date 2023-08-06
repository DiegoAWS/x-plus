import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Guardian from "./components/guardian/Guardian";
import { BarChartOutlined, CalendarOutlined, HomeOutlined, MenuUnfoldOutlined, SnippetsOutlined } from "@ant-design/icons";
import Outlet from "./pages/outlet/Outlet";

export const HOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const DASHBOARD_PATH = "/dashboard";
export const TEMPLATES_PATH = "/templates";
export const RECURRENT_TASKS_PATH = "/recurrent-tasks";
export const TASKS_PATH = "/tasks";
export const ANALYTICS_PATH = "/analytics";

export const routes = [
  {
    path: HOME_PATH,
    element: (
      <Guardian
        publicComponent={<Home />}
        privateComponent={<Outlet />}
      />
    ),
    children: [
      {
        index: true,
        element: <Navigate to={DASHBOARD_PATH} />,
      },
      {
        path: DASHBOARD_PATH,
        title: "Dashboard",
        icon: <HomeOutlined />,
        element: <Guardian privateComponent={<Dashboard />} />,
      },
      {
        path: TEMPLATES_PATH,
        title: "Templates",
        icon: <SnippetsOutlined />,
        element: <Guardian privateComponent={<Dashboard />} />,
      },
      {
        path: TASKS_PATH,
        title: "Tasks",
        icon: <MenuUnfoldOutlined />,
        element: <Guardian privateComponent={<Dashboard />} />,
      },
      {
        path: RECURRENT_TASKS_PATH,
        title: "Recurrent Tasks",
        icon: <CalendarOutlined />,
        element: <Guardian privateComponent={<Dashboard />} />,
      },
      {
        path: ANALYTICS_PATH,
        title: "Analytics",
        icon: <BarChartOutlined />,
        element: <Guardian privateComponent={<Dashboard />} />,
      },
    ]
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
 
];

export const router = createBrowserRouter(routes);
