import React, { useEffect, useState } from 'react';
import { IWordData } from '../../../../types/WordInterface.ts';
import WordService from '../../../../http/services/WordService.ts';
import StyledInput from './StyledInput';
import SearchIcon from '@mui/icons-material/Search';
import RoundedInput from "../../../ui/RoundedInput/RoundedInput.tsx";

export type TWordError = null | 'NOT_FOUND' | 'OTHER';

interface SearchInterface {
    setWordData: (value: IWordData | null) => void;
    setWordError: (value: TWordError) => void;
    setIsLoading: (value: boolean) => void;
    defaultQuery: string;
}

const Search: React.FC<SearchInterface> = ({
                                               setWordData,
                                               defaultQuery,
                                               setWordError,
                                               setIsLoading,
                                           }) => {
    const [query, setQuery] = useState<string>(defaultQuery);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    let timerId: NodeJS.Timeout;

    async function fetchWord() {
        if (query === '') {
            setWordData(null);
            setWordError(null);
            setIsLoading(false);
            return;
        }
        try {
            setIsLoading(true);
            setWordError(null);
            const fetchedWordData = await WordService.searchWord(query);
            setWordData(fetchedWordData);
        } catch (e) {
            setWordData(null);
            if (e?.response?.status === 404) {
                setWordError('NOT_FOUND');
            } else {
                setWordError('OTHER');
            }
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (isTyping) {
            timerId = setTimeout(() => {
                fetchWord();
                setIsTyping(false);
            }, 500);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isTyping, query]);

    return (
        <>
            <RoundedInput
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsTyping(true);
                }}
                onSubmit={() => {
                    fetchWord();
                    clearTimeout(timerId);
                    setIsTyping(false);
                }}
                icon={<SearchIcon />} // Передача значка (иконки) в качестве пропса
            />
        </>
    );
};

export default Search;