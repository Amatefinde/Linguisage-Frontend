import React, {useEffect, useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/joy/Input";
import {IWordData} from "../../../../types/WordInterface.ts";
import WordService from "../../../../http/services/WordService.ts";

export type TWordError = null | "NOT_FOUND" | "OTHER"

interface SearchInterface {
    setWordData: (value: IWordData | null) => void;
    setWordError: (value: TWordError) => void;
    setIsLoading: (value: boolean) => void;
    defaultQuery: string;
}

const Search: React.FC<SearchInterface> = ({setWordData, defaultQuery, setWordError, setIsLoading}) => {
    const [query, setQuery] = useState<string>(defaultQuery)
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const [isActive, setIsActive] = useState(false);

    async function fetchWord() {
        try {
            setIsLoading(true)
            setWordError(null)
            const fetchedWordData = await WordService.searchWord(query)
            setWordData(fetchedWordData)
        } catch (e) {
            setWordData(null)
            if (e?.response?.status === 404) {
                setWordError("NOT_FOUND")
            } else {
                setWordError("OTHER")
            }
        }
        setIsLoading(false)
    }

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (isTyping) {
            timerId = setTimeout(() => {
                fetchWord()
                setIsTyping(false)
            }, 500)
        }
        return () => {
            // Очищаем таймер при каждом изменении inputValue
            clearTimeout(timerId);
        };
    }, [isTyping, query]);

    const handleFocus = () => {
        setIsActive(true);
    };

    const handleBlur = () => {
        setIsActive(false);
    };

    return (
        <Input

            value={query}
            onChange={e => {
                setQuery(e.target.value)
                setIsTyping(true)
            }}
            variant={"soft"}
            color={isActive ? "primary" : "neutral"}
            onFocus={handleFocus}
            onBlur={handleBlur}
            sx={{
                '--Input-radius': `20px`,
                '&::before': {
                    top: 'unset',
                },
            }}
            startDecorator={<SearchIcon/>}
        />
    );
};

export default Search;