import React, {useEffect, useState} from 'react';
import Input from "@mui/joy/Input";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import classes from "./DictionarySearch.module.css";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../store";
import WordService from "../../../../../http/services/WordService.ts";
import {setUserSenses} from "../../../../../store/userSenses/userSensesSlice.ts";
import useDebouncing from "../../../../../hooks/useDebouncing.ts";

interface IDictionarySearchProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DictionarySearch: React.FC<IDictionarySearchProps> = ({setIsLoading}) => {
    const [querySearch, setQuerySearch] = useState<string>("")
    const dispatch = useDispatch<AppDispatch>();
    const [isTyping, setIsTyping] = useState<boolean>(false)

    async function fetchSense() {
        setIsLoading(true)
        try {
            const fetchedSense = await WordService.getMySenses(querySearch)
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
    }, []);

    const timerId = useDebouncing(fetchSense, isTyping, setIsTyping, querySearch)

    return (
        <div>
            <Input
                sx={{
                    borderRadius: 40,
                    '&::before': {
                        top: 'unset',
                    },
                }}
                onChange={e => {
                    setIsTyping(true)
                    setQuerySearch(e.target.value)
                }}
                value={querySearch}
                size="lg"
                variant={"soft"}
                startDecorator={<SearchRoundedIcon/>}/>
        </div>
    );
};

export default DictionarySearch;