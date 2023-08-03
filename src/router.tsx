import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import HomeOutlined from "@ant-design/icons/HomeOutlined";
import Home from "./pages/home/Home";

const routes = [
  {
    path: "/",
    element: <Home />,
    name: "Home",
    icon: <HomeOutlined />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {

  }
];
export const router = createBrowserRouter(
  routes.map(({ path, element }) => ({
    path,
    element,
  }))
);
