import React, {useEffect, useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/joy/Input";
import {IWordData} from "../../../../types/WordInterface.ts";
import WordService from "../../../../http/services/WordService.ts";

interface SearchInterface {

    setWordData: (value: IWordData) => void;
}

const Search: React.FC<SearchInterface> = ({setWordData}) => {
    const [query, setQuery] = useState<string>("")
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const [isActive, setIsActive] = useState(false);

    async function fetchWord() {
        try {
            const fetchedWordData = await WordService.searchWord(query)
            setWordData(fetchedWordData)
        } catch (e) {
            console.log("Произошла ошибка при поиске слова:", e)
        }

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