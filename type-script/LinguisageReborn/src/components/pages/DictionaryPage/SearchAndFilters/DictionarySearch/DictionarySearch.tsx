import React from 'react';
import Input from "@mui/joy/Input";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import classes from "./DictionarySearch.module.css";

const DictionarySearch = () => {
    return (
        <div>
            <Input
                sx={{
                    borderRadius: 40,
                    '&::before': {
                        top: 'unset',
                    },
                }}
                size="lg"
                variant={"soft"}
                startDecorator={<SearchRoundedIcon/>}/>
        </div>
    );
};

export default DictionarySearch;