import type { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

type Props<L> = {
    axiosFn: (params: L) => Promise<AxiosResponse>;
    isDisabled?: boolean;
    dependencies?: unknown;
    parameters?: L;
}

function useQuery<T, K = void>({
    axiosFn,
    parameters,
    isDisabled = false,
    dependencies,
}: Props<K>) {

    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const fetchData = useCallback(async (params: K) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axiosFn(params);
            if (response?.statusText !== "OK") throw response;

            setData(response?.data);
        } catch (error) {
            setError(JSON.stringify(error));
        }
        setIsLoading(false);
    }, [axiosFn]);

    const refresh = (params: K) => {
        fetchData(params);
    }
    const dependenciesString = JSON.stringify(dependencies) || "";

    useEffect(() => {
        if (isDisabled) return;

        fetchData(parameters as K);
    }, [fetchData, isDisabled, dependenciesString, parameters]);

    return { data, isLoading, error, refresh };

}
export default useQuery;
