import React from 'react';
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Check from "@mui/icons-material/Check";
import CardActions from "@mui/joy/CardActions";
import Button from "@mui/joy/Button";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Card from "@mui/joy/Card";
import {Checkbox, Slider} from "@mui/joy";

const YourWordList = () => {
    return (
        <Card
            size="lg"
            variant="solid"
            color="neutral"
            invertedColors
            sx={{borderRadius: 20, width: 590, height: 295, bgcolor: 'neutral.900'}}
        >
            <Chip size="sm" variant="outlined">
                MOST POPULAR
            </Chip>
            <Typography level="h2">Your words</Typography>
            <Divider inset="none"/>
            <List
                size="sm"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                }}
            >
                <ListItem>
                    <Checkbox/>
                    Default
                </ListItem>
                <ListItem>
                    <Checkbox/>
                    Татары
                </ListItem>
                <ListItem>
                    <Checkbox/>
                    Татары
                </ListItem>
            </List>
            <Divider inset="none"/>
            <CardActions sx={{gap: 5}}>
                <div>
                    <Typography level="title-lg" fontSize={16}>Number of words</Typography>
                    <Slider
                        color={"primary"}
                        sx={{
                            // "--Slider-markSize": "0px",
                            width: 380,
                        }}
                        defaultValue={10}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={3}
                        max={25}
                    />
                </div>
                <Button endDecorator={<KeyboardArrowRight/>}>Start now</Button>
            </CardActions>
        </Card>
    );
};

export default YourWordList;