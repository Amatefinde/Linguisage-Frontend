import React, {useEffect, useState} from 'react';
import DictionarySearch from "./DictionarySearch/DictionarySearch.tsx";
import Filters from "./Filters/Filters.tsx";
import classes from "./SearchAndFilters.module.css"
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../store";
import WordService from "../../../../http/services/WordService.ts";
import {setUserSenses} from "../../../../store/userSenses/userSensesSlice.ts";
import {IWordStatus} from "../../../../types/IWordStatus.ts";




const SearchAndFilters = ({setIsAddWordOpen, setIsLoading}) => {

    const dispatch = useDispatch<AppDispatch>();
    const [querySearch, setQuerySearch] = useState<string>("")
    const [wordStatusFilter, setWordStatusFilter] = React.useState<IWordStatus[]>(["in_queue", "in_process"]);
    async function fetchSense() {
        setIsLoading(true)
        try {
            const fetchedSense = await WordService.getMySenses(querySearch, wordStatusFilter)
            dispatch(setUserSenses(fetchedSense))
        } catch (e) {
        }
        setIsLoading(false)
    }

    useEffect(() => {
        try {
            fetchSense()
        } catch (e) {
            console.log("Во время фетча словаря пользователя произошла ошибка:", e)
        }
    }, [wordStatusFilter]);

    return (
        <div className={classes.wrapper}>
            <DictionarySearch setQuerySearch={setQuerySearch} querySearch={querySearch} fetchSense={fetchSense}/>
            <Filters setIsAddWordOpen={setIsAddWordOpen} wordStatusFilter={wordStatusFilter} setWordStatusFilter={setWordStatusFilter}/>
        </div>
    );
};

export default SearchAndFilters;