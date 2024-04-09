import React from 'react';
import DictionarySearch from "./DictionarySearch/DictionarySearch.tsx";
import Filters from "./Filters/Filters.tsx";
import classes from "./SearchAndFilters.module.css"

const SearchAndFilters = ({setIsAddWordOpen, setIsLoading}) => {
    return (
        <div className={classes.wrapper}>
            <DictionarySearch setIsLoading={setIsLoading}/>
            <Filters setIsAddWordOpen={setIsAddWordOpen}/>
        </div>
    );
};

export default SearchAndFilters;