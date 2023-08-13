import type { AxiosResponse } from "axios";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useMainContext from "../contexts/useMainContext";
const defaultParameters = {};
type Props<K> = {
    axiosFn?: (params: K) => Promise<AxiosResponse>;
    path?: string;
    method?: string;
    isDisabled?: boolean;
    dependencies?: unknown;
    parameters?: K;
    isArray?: boolean;
}

function useQuery<T, K = void>({
    axiosFn=undefined,
    path,
    method,
    isArray = false,
    parameters= defaultParameters as K,
    isDisabled = false,
    dependencies,
}: Props<K>) {



    const [data, setData] = useState<T>( (isArray? [] : undefined )as unknown as T);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const { netlifyIdentity } = useMainContext();

    const fetchData = useCallback(async (params: K) => {
        setIsLoading(true);
        setError('');

        try {
            
            let response;
            if (axiosFn) {
                response = await axiosFn(params);
            } else {
                const token = netlifyIdentity?.currentUser()?.token?.access_token;

                const auth = token? {
                    Authorization: `Bearer ${token}`
                } : {};
                response = await axios({
                    url: path,
                    method,
                    data:params,
                    headers:{
                        ...auth,
                        "Accept": "application/json",
                    }

                })
            }
            const isGoodResponse = [200, 201, 204].includes(response?.status);
            if (response?.statusText !== "OK" && !isGoodResponse) throw response;


            setData(response?.data);
        } catch (e) {

            console.log("ERRROR")
            type Error = {
                message?: string;
            }

            setError(JSON.stringify((e as Error)?.message || e));
        }
        setIsLoading(false);
    }, [axiosFn, method, netlifyIdentity, path]);

    const refresh = useCallback((params: K) => {
        fetchData(params);
    }, [fetchData]);

    const dependenciesString = JSON.stringify(dependencies) || "";

    useEffect(() => {
        if (isDisabled) return;

        fetchData(parameters as K);
    }, [fetchData, isDisabled, dependenciesString, parameters]);

    return { data, isLoading, error, refresh };

}
export default useQuery;
