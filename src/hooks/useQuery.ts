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
            if (response?.statusText !== "OK" && response.status !== 200 && response.status !== 201) throw response;

            setData(response?.data);
        } catch (e ) {

            type Error = {
                message?: string;
            }

            setError(JSON.stringify((e as Error)?.message  || e ));
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
