import LoginForm from "./LoginForm.tsx"

function Login() {

  const signInWithTwitter = () => {
    console.log("sign in with twitter");
  }

  return <LoginForm signInWithTwitter={signInWithTwitter}/>;
}

export default Login;
