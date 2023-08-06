import { Navigate } from "react-router-dom";
import useMainContext from "../../contexts/useMainContext.tsx";
import useLogin from "../../hooks/useLogin.ts";
import LoginForm from "./LoginForm.tsx";
import { HOME_PATH } from "../../router.tsx";

function Login() {
  const { signInWithTwitter, isLoading, error } = useLogin();
  const { twitterToken } = useMainContext();

  if(twitterToken) {
    return <Navigate to={HOME_PATH} />;
  }
  return (
    <LoginForm
      signInWithTwitter={signInWithTwitter}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default Login;
