import * as React from 'react';
import {Box} from "@mui/joy";
import Header from "../../blocks/Header/Header.tsx";
import YourWordList from "./YourWordList/YourWordList.tsx";
import RandomWords from "./RandomWords/RandomWords.tsx";

const PreTrainPage: React.FC = () => {
    return (
        <>
            <Header/>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    gap: 2,
                    justifyContent: "center",
                    marginTop: 2,
                }}
            >
                <RandomWords/>
                <YourWordList/>
            </Box>
        </>
    );
};

export default PreTrainPage;