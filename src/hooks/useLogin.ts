


import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useQuery from "./useQuery.ts";
import { getLoginUrl, login, type LoginParams } from "../services/auth.ts";

type AuthUrlResponse = {
    authUrl: string;
};


function useLogin() {

    const [searchParams, setSearchParams] = useSearchParams();
    const {
        data: getUrlResponse,
        isLoading: isLoadingGetUrl,
        error: errorGetUrl,
        refresh: signInWithTwitter,
    } = useQuery<AuthUrlResponse>({ axiosFn: getLoginUrl, isDisabled: true });

    const {
        data: dataLogin,
        isLoading: isLoadingLogin,
        error: errorLogin,
        refresh: signIn,
    } = useQuery<{token: string;}, LoginParams>({ axiosFn: login, isDisabled: true });




    useEffect(() => {
        if (getUrlResponse?.authUrl) {
            window.location.replace(getUrlResponse.authUrl);
        }
    }, [getUrlResponse]);


    useEffect(() => {
        (async () => {
            if (searchParams.has("state") && searchParams.has("code")) {
                const state = searchParams.get("state");
                const code = searchParams.get("code");
                const veryfyState = import.meta.env.VITE_TWITTER_STATE;

                setSearchParams({})

                if (state === veryfyState && code && state) {

                    signIn({ code, state });
                }
            }
        })();
    }, [searchParams, setSearchParams, signIn]);


    useEffect(() => {
        if (dataLogin?.token) {

            console.log(dataLogin?.token);
        }
    }, [dataLogin]);



    return {
        signInWithTwitter,
        isLoading: isLoadingGetUrl || isLoadingLogin,
        dataLogin,
        error: errorLogin || errorGetUrl,
    }
}

export default useLogin