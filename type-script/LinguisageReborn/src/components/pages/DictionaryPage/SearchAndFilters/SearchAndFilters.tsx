import React from 'react';
import DictionarySearch from "./DictionarySearch/DictionarySearch.tsx";
import Filters from "./Filters/Filters.tsx";
import classes from "./SearchAndFilters.module.css"

const SearchAndFilters = () => {
    return (
        <div className={classes.wrapper}>
            <DictionarySearch/>
            <Filters/>
        </div>
    );
};

export default SearchAndFilters;