import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {Box} from "@mui/joy";
import Header from "../../blocks/Header/Header.tsx";
import YourWordList from "./YourWordList/YourWordList.tsx";
import RandomWords from "./RandomWords/RandomWords.tsx";

const PreTrainPage = () => {
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