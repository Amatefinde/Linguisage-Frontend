import React, { useState } from 'react';
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import CardActions from "@mui/joy/CardActions";
import Button from "@mui/joy/Button";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Card from "@mui/joy/Card";
import { Checkbox, Slider } from "@mui/joy";
import {useNavigate} from "react-router-dom";

const YourWordList: React.FC = () => {
    const [totalAmountOfWords, setTotalAmountOfWords] = useState<number>(10);
    const [percentOfStudiedWords, setPercentOfStudiedWords] = useState<number>(10);
    const [buildSentences, setBuildSentences] = useState<boolean>(true);
    const navigate = useNavigate()
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBuildSentences(event.target.checked);
    };

    const handlePercentSliderChange = (_event: Event, newValue: number | number[]) => {
        setPercentOfStudiedWords(newValue as number);
    };

    const handleWordsSliderChange = (_event: Event, newValue: number | number[]) => {
        setTotalAmountOfWords(newValue as number);
    };

    function startTraining() {
        // @ts-ignore
        const queryParams = new URLSearchParams({totalAmountOfWords, percentOfStudiedWords, buildSentences}).toString();
        navigate(`/training?${queryParams}`);
    }

    return (
        <Card
            size="lg"
            variant="solid"
            color="neutral"
            invertedColors
            sx={{borderRadius: 20, width: 590, height: 295, bgcolor: 'neutral.900'}}
        >
            <Chip size="sm" variant="outlined">
                YOUR WAY
            </Chip>
            <Typography level="h2">Your words</Typography>
            <Divider inset="none"/>
            <List
                size="sm"
                sx={{
                    height: 36,
                    display: 'grid',
                    gridTemplateColumns: '3fr 7fr',
                }}
            >
                <ListItem>
                    <Checkbox
                        checked={buildSentences}
                        onChange={handleCheckboxChange}
                    />
                    Build sentences
                </ListItem>
                <ListItem sx={{gap: 2}}>
                    Learned Words Percentage
                    <Slider
                        sx={{width: 155}}
                        value={percentOfStudiedWords}
                        onChange={handlePercentSliderChange}
                        min={0}
                        max={100}
                        step={1}
                        valueLabelDisplay="auto"
                    />
                </ListItem>
            </List>
            <CardActions sx={{gap: 5}}>
                <div>
                    <Typography level="title-lg" fontSize={16}>Number of words</Typography>
                    <Slider
                        color="primary"
                        sx={{
                            width: 380,
                        }}
                        value={totalAmountOfWords}
                        onChange={handleWordsSliderChange}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={3}
                        max={25}
                    />
                </div>
                <Button endDecorator={<KeyboardArrowRight/>} onClick={startTraining}>Start now</Button>
            </CardActions>
        </Card>
    );
};

export default YourWordList;