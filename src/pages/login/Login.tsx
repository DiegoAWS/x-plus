import useLogin from "../../hooks/useLogin.ts";
import LoginForm from "./LoginForm.tsx";

function Login() {
  const { signInWithTwitter, isLoading, error } = useLogin();

  return (
    <LoginForm
      signInWithTwitter={signInWithTwitter}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default Login;
