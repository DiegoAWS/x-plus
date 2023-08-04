import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

type Props = {
    axiosFn: (params: unknown) => Promise<AxiosResponse>;
    isDisabled?: boolean;
    dependencies?: unknown;
    params?: unknown;
}

function useQuery({
    axiosFn,
    params,
    isDisabled = false,
    dependencies,
}: Props) {

    const [data, setData] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);
    const [counter, setCounter] = useState<number>(0);

    const refresh = () => {
        setCounter(old => old + 1);
    }
    const dependenciesString = JSON.stringify(dependencies) || "";

    useEffect(() => {
        console.log("useQuery: useEffect");
        if (isDisabled) return;
        const fetchData = async () => {
            console.log("useQuery: fetchData");
            setIsLoading(true);
            try {
                const response = await axiosFn(params);
                if (response?.statusText !== "OK") throw response;

                setData(response?.data);
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [axiosFn, isDisabled, counter, dependenciesString, params]);

    return { data, isLoading, error, refresh };

}
export default useQuery;
