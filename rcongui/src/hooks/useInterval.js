import React from "react"

export const useInterval = (callback, ms) => {
    const [error, setError] = React.useState();
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const intervalRef = React.useRef(null);

    const load = React.useCallback(async () => {
        setLoading(true);
        try {
            const response = await callback();
            if (!response.ok) throw new Error(response.status || 'Bad Request');
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }, [callback])

    const execute = React.useCallback(async () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        await load();
        intervalRef.current = setInterval(load, ms);
    }, [load, ms])

    React.useEffect(() => {
        execute();
        return () => {
            clearInterval(intervalRef.current);
        }
    }, [load, ms])

    return { data, loading, error, refresh: execute }
}
