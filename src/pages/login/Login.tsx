import LoginForm from "./LoginForm.tsx";
import { getLoginUrl } from "../../services/auth.ts";
import useQuery from "../../hooks/useQuery.ts";
import { useSearchParams } from 'react-router-dom';

type AuthUrlResponse = {
  authUrl: string;
}
function Login() {
  const [searchParams] = useSearchParams();
  const {
    data,
    isLoading,
    error,
    refresh: signInWithTwitter,
  } = useQuery<AuthUrlResponse>({ axiosFn: getLoginUrl, isDisabled: true });

  console.log(searchParams);

  if(data?.authUrl) {
    window.location.replace(data.authUrl);
  }
  
  return <LoginForm signInWithTwitter={signInWithTwitter} isLoading={isLoading} error={error}/>;
}

export default Login;
