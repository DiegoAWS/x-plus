import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useQuery from "./useQuery.ts";
import { type LoginParams } from "../services/auth.ts";
import type { TwitterToken } from "../types/index.ts";
import { TWITTER_STATE, createLocalStorage } from "../services/localStore.ts";
import { getTwitterOauthUrl } from "../services/twitter.ts";

const COMPANY_DATA = "company_data";

function useLogin() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [genericError, setGenericError] = useState("")

    const {
        data: dataLogin,
        isLoading: isLoadingLogin,
        error: errorLogin,
        refresh: signIn,
    } = useQuery<TwitterToken, LoginParams>({ path: "/.netlify/functions/login-twitter", isDisabled: true });

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

                    const storage = createLocalStorage(COMPANY_DATA)

                    const { companyName, logo } = storage.getObject() || {};

                    signIn({ code, companyName, logo });
                    storage.clear();
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

    type Params = {
        companyName: string;
        logo: string;
    };

    const signInWithTwitter = ({ companyName, logo }: Params) => {

        createLocalStorage(COMPANY_DATA).setObject({
            companyName,
            logo
        });
        const authUrl = getTwitterOauthUrl()
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