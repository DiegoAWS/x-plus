import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import {
  BarChartOutlined,
  CalendarOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import Templates from "./pages/templates/Templates";
import CreateClientAccount from "./pages/createClientAccount/CreateClientAccount";
import Guardian from "./components/guardian/Guardian";

export const CREATE_CLIENT_ACCOUNT_PATH = "/create-client-account";

export const HOME_PATH = "/";

export const DASHBOARD_PATH = "/dashboard";
export const TEMPLATES_PATH = "/templates";
export const RECURRENT_TASKS_PATH = "/recurrent-tasks";
export const TASKS_PATH = "/tasks";
export const ANALYTICS_PATH = "/analytics";

export const routes = [
  {
    path: HOME_PATH,
    element: <Guardian />,
    topLevel: true,
    children: [
      {
        index: true,
        element: <Navigate to={DASHBOARD_PATH} />,
      },
      {
        path: DASHBOARD_PATH,
        title: "Dashboard",
        icon: <HomeOutlined />,
        element: <Dashboard />,
      },
      {
        path: TEMPLATES_PATH,
        title: "Templates",
        icon: <SnippetsOutlined />,
        element: <Templates />,
      },
      {
        path: TASKS_PATH,
        title: "Tasks",
        icon: <MenuUnfoldOutlined />,
        element: null,
      },
      {
        path: RECURRENT_TASKS_PATH,
        title: "Recurrent Tasks",
        icon: <CalendarOutlined />,
        element: null,
      },
      {
        path: ANALYTICS_PATH,
        title: "Analytics",
        icon: <BarChartOutlined />,

        element: null,
      },
      {
        path: CREATE_CLIENT_ACCOUNT_PATH,
        element: <CreateClientAccount />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={HOME_PATH} />,
  },
];

export const router = createBrowserRouter(routes);
