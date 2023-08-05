import {  useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useQuery from "./useQuery.ts";
import { getLoginUrl, login, type LoginParams } from "../services/auth.ts";
import useMainContext from "../contexts/useMainContext.tsx";
import type { TwitterToken } from "../types/index.ts";


type AuthUrlResponse = {
    authUrl: string;
};


function useLogin() {

    const { storeTwitterToken } = useMainContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
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
    } = useQuery<TwitterToken, LoginParams>({ axiosFn: login, isDisabled: true });


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
            storeTwitterToken(dataLogin);
        }
    }, [dataLogin, storeTwitterToken, navigate]);



    return {
        signInWithTwitter,
        isLoading: isLoadingGetUrl || isLoadingLogin,
        dataLogin,
        error: errorLogin || errorGetUrl,
    }
}

export default useLogin