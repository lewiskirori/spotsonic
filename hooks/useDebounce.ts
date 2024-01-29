import { useEffect, useState } from "react";


function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        setDebouncedValue(value);
    }, [value]);

    return debouncedValue;
};

export default useDebounce;