import ReactDOM from "react-dom/client";
import MainContextProvider from "./contexts/MainContext.tsx";
import App from "./App.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MainContextProvider>
    <App />
  </MainContextProvider>
);
