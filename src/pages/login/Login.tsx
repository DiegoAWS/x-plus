import {  useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm.tsx";
import { getLoginUrl } from "../../services/auth.ts";

function Login() {
  const navigate = useNavigate();

  const signInWithTwitter = async() => {
    
    const {authUrl} = await getLoginUrl();
    console.log(loginUrl);
  };

  return <LoginForm signInWithTwitter={signInWithTwitter} />;
}

export default Login;
