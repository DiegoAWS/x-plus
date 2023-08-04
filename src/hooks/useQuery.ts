import { useEffect, useState } from "react";

type Props = {
    fn: () => Promise<unknown>;
    isDisabled?: boolean;
    dependencies?: unknown;
}

function useQuery({
    fn,
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
                const response = await fn();
                setData(response);
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [fn, isDisabled, counter, dependenciesString]);

    return { data, isLoading, error, refresh };

}
export default useQuery;
