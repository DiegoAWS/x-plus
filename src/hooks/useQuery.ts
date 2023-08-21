import type { AxiosError, AxiosResponse } from "axios";
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
    axiosFn = undefined,
    path,
    method,
    isArray = false,
    parameters = defaultParameters as K,
    isDisabled = false,
    dependencies,
}: Props<K>) {



    const [data, setData] = useState<T>((isArray ? [] : undefined) as unknown as T);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const { netlifyIdentity } = useMainContext();

    const fetchData = useCallback(async (params: K): Promise<AxiosResponse> => {
        setIsLoading(true);
        setError('');

        let response;
        try {

            if (axiosFn) {
                response = await axiosFn(params);
            } else {
                const token = netlifyIdentity?.currentUser()?.token?.access_token;

                const auth = token ? {
                    Authorization: `Bearer ${token}`
                } : {};
                response = await axios({
                    url: path,
                    method,
                    data: params,
                    headers: {
                        ...auth,
                        "Accept": "application/json",
                    }

                });
            }
            const isGoodResponse = [200, 201, 204].includes(response?.status);
            if (response?.statusText !== "OK" && !isGoodResponse) throw response;


            setData(response?.data);
            return response;
        } catch (e) {

            console.log("ERRROR")


            const error = (e as AxiosError);

            setError(JSON.stringify(error?.message || e));
            return error?.response as AxiosResponse;

        } finally {
            setIsLoading(false);

        }
    }, [axiosFn, method, netlifyIdentity, path]);

    const refresh = useCallback(async (params: K) => {
        return fetchData(params);
    }, [fetchData]);

    const dependenciesString = JSON.stringify(dependencies) || "";

    useEffect(() => {
        if (isDisabled) return;

        fetchData(parameters as K);
    }, [fetchData, isDisabled, dependenciesString, parameters]);

    return { data, isLoading, error, refresh };

}
export default useQuery;
