import React, {useEffect} from "react";

export default function (
    callback: Function, isTyping: boolean,
    setIsTyping: React.Dispatch<React.SetStateAction<boolean>>,
    query: string,
    timeout: number = 500,) {

    // @ts-ignore
    let timerId: NodeJS.Timeout;

    useEffect(() => {
        if (isTyping) {
            timerId = setTimeout(() => {
                callback();
                setIsTyping(false);
            }, timeout);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isTyping, query]);
    return timerId
}