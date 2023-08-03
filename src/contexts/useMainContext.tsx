import { useContext } from "react";
import { MainContext } from "./MainContext";

function useMainContext() {
    return useContext(MainContext);
  }
  export default useMainContext;