import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useQuery from "./useQuery.ts";
import { login, type LoginParams } from "../services/auth.ts";
import type { TwitterToken } from "../types/index.ts";
import { TWITTER_STATE, createLocalStorage } from "../services/localStore.ts";
import { getTwitterOauthUrl } from "../services/twitter.ts";
import useMainContext from "../contexts/useMainContext.tsx";
import { toast } from "react-toastify";


const COMPANY_NAME_STORAGE_KEY = "companyNameStorageKey";

function useLogin() {

    // const {? storeTwitterToken } = useMainContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [genericError, setGenericError] = useState("")
    const { netlifyIdentity } = useMainContext();

    const {
        data: dataLogin,
        isLoading: isLoadingLogin,
        error: errorLogin,
        refresh: signIn,
    } = useQuery<TwitterToken, LoginParams>({ axiosFn: login, isDisabled: true });



    useEffect(() => {
        (async () => {
            const stateStorage = createLocalStorage(TWITTER_STATE)
            const verifyState = stateStorage.get()

            if (!searchParams.has("state") || searchParams.get("state") !== verifyState) return;

            stateStorage.clear();

            if (searchParams.has("code")) {
                const state = searchParams.get("state");
                const code = searchParams.get("code");

                if (code && state) {

                    const storage = createLocalStorage(COMPANY_NAME_STORAGE_KEY)

                    const companyName = storage.get() || "";

                    console.log({ companyName })
                    // storage.clear();

                    signIn({ code, companyName });
                }
            }
            if (searchParams.has("error")) {
                const twitter_login_error = searchParams.get("error");
                console.log({ twitter_login_error })
                setGenericError("An error occurred while trying to login with Twitter");
            }

            setSearchParams({})

        })();
    }, [searchParams, setSearchParams, signIn]);


    useEffect(() => {
        if (dataLogin) {

            toast("Please login again to continue to your company dashboard",{
                onClose: async() => {
                   await  netlifyIdentity.logout()
                }
            })


        }
    }, [dataLogin, netlifyIdentity]);

    type Params = {
        companyName: string;
    };

    const signInWithTwitter = (form: Params) => {
        createLocalStorage(COMPANY_NAME_STORAGE_KEY).set(form.companyName);

        const authUrl = getTwitterOauthUrl()

        console.log({ authUrl })
        window.location.replace(authUrl);
    }

    return {
        signInWithTwitter,
        isLoading: isLoadingLogin,
        dataLogin,
        error: genericError || errorLogin,
    }
}

export default useLogin