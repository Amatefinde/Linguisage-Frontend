import {useEffect, useLayoutEffect, useState} from "react";

export default function useLocalStorage(key, item) {
    let defaultValue;
    if (!!localStorage.getItem(key)) {
        defaultValue = localStorage.getItem(key)
    } else {
        defaultValue = item
    }
    const [value, setValue] = useState(defaultValue)
    useEffect(() => {
        localStorage.setItem(key, value)
    }, [value]);

    return [value, setValue];
}