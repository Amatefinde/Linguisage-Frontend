import React, {useEffect, useState} from "react";
import classes from "./SenseSearch.module.css";
import CompactSearch from "../../../ui/Search/CompactSearch";

const SenseSearch = ({value, setValue, doSearch}) => {

    const [isFirstSearch, setIsFirstSearch] = useState(true)

    useEffect(() => {
        let timeoutId;
        if (isFirstSearch) {
            setIsFirstSearch(false)
        } else {
            timeoutId = setTimeout(() => {
                doSearch()
            }, 1000);
        }
        return () => clearTimeout(timeoutId);
    }, [value]);


    return (
        <CompactSearch placeholder={"start typing here"} setValue={setValue} value={value} doSearch={doSearch}/>
    );
};

export default SenseSearch;
