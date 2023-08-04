import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { theme } from "antd";
import { useEffect } from "react";
const { useToken } = theme;

function App() {
  const { token } = useToken();
  useEffect(() => {
    document.body.style.backgroundColor = token.colorBgContainer;
  }, [token]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
