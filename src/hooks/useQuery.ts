import type { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

type Props = {
    axiosFn: (params: unknown) => Promise<AxiosResponse>;
    isDisabled?: boolean;
    dependencies?: unknown;
    params?: unknown;
}

function useQuery<T>({
    axiosFn,
    params,
    isDisabled = false,
    dependencies,
}: Props) {

    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const fetchData = useCallback(async () => {
        console.log("useQuery: fetchData");
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
    }, [axiosFn, params]);

    const refresh = () => {
        fetchData();
    }
    const dependenciesString = JSON.stringify(dependencies) || "";

    useEffect(() => {
        if (isDisabled) return;


        fetchData();
    }, [fetchData, isDisabled, dependenciesString, params]);

    return { data, isLoading, error, refresh };

}
export default useQuery;
