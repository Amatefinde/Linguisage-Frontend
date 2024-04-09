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
    fetchSense: Function;
    querySearch: string;
    setQuerySearch: React.Dispatch<React.SetStateAction<string>>;
}

const DictionarySearch: React.FC<IDictionarySearchProps> = ({fetchSense, querySearch, setQuerySearch}) => {
    const [isTyping, setIsTyping] = useState<boolean>(false)
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