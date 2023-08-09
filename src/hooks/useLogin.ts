import {  useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useQuery from "./useQuery.ts";
import { getLoginUrl, login, type LoginParams } from "../services/auth.ts";
// import useMainContext from "../contexts/useMainContext.tsx";
import type { TwitterToken } from "../types/index.ts";
import { createLocalStorage } from "../services/localStore.ts";


type AuthUrlResponse = {
    authUrl: string;
};

const COMPANY_NAME_STORAGE_KEY = "companyNameStorageKey";

function useLogin() {

    // const {? storeTwitterToken } = useMainContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [genericError, setGenericError] = useState("")
    // const navigate = useNavigate();
    const {
        data: getUrlResponse,
        isLoading: isLoadingGetUrl,
        error: errorGetUrl,
        refresh: getAuthUrl,
    } = useQuery<AuthUrlResponse>({ axiosFn: getLoginUrl, isDisabled: true });

    const {
        data: dataLogin,
        isLoading: isLoadingLogin,
        error: errorLogin,
        refresh: signIn,
    } = useQuery<TwitterToken, LoginParams>({ axiosFn: login, isDisabled: true});


    useEffect(() => {
        if (getUrlResponse?.authUrl) {
            window.location.replace(getUrlResponse.authUrl);
        }
    }, [getUrlResponse]);

    useEffect(() => {
        (async () => {
            const verifyState = import.meta.env.VITE_TWITTER_STATE;
            if (!searchParams.has("state") || searchParams.get("state") !== verifyState) return;

            if (searchParams.has("code")) {
                const state = searchParams.get("state");
                const code = searchParams.get("code");

                if (code && state) {

                    const storage = createLocalStorage(COMPANY_NAME_STORAGE_KEY)

                    const companyName = storage.get() || "";

                    console.log({companyName})
                    // storage.clear();

                    signIn({ code, state, companyName });
                }
            }
            if (searchParams.has("error")) {
                const twitter_login_error = searchParams.get("error");
                console.log({ twitter_login_error })
                setGenericError("An error occurred while trying to login with Twitter");
            }

            setSearchParams({})

        })();
    }, [ searchParams, setSearchParams, signIn]);


    // useEffect(() => {
    //     if (dataLogin?.token) {
    //         storeTwitterToken(dataLogin);
    //     }
    // }, [dataLogin, storeTwitterToken, navigate]);

    type Params = {
        companyName: string;
    };

    const signInWithTwitter = (form: Params) => {
        createLocalStorage(COMPANY_NAME_STORAGE_KEY).set(form.companyName);
        getAuthUrl();
    }

    return {
        signInWithTwitter,
        isLoading: isLoadingGetUrl || isLoadingLogin,
        dataLogin,
        error:  genericError || errorLogin || errorGetUrl,
    }
}

export default useLogin