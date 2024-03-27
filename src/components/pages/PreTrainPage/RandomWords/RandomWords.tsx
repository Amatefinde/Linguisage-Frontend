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
import {IconButton, Slider, ToggleButtonGroup} from "@mui/joy";

const RandomWords = () => {
    const [value, setValue] = React.useState(['a2', 'b1']);

    return (
        <Card sx={{borderRadius: 20, width: 590, height: 295}} size="lg" variant="outlined">
            <Chip size="sm" variant="outlined" color="neutral">
                BASIC
            </Chip>
            <Typography level="h2">Random words</Typography>
            <Divider inset="none"/>
            <ToggleButtonGroup
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <Button value="a1">A1</Button>
                <Button value="a2">A2</Button>
                <Button value="b1">B1</Button>
                <Button value="b2">B2</Button>
                <Button value="c1">C1</Button>
                <Button value="c2">C2</Button>
            </ToggleButtonGroup>
            <Divider inset="none"/>
            <CardActions sx={{gap: 5}}>
                <div>
                    <Typography level="title-lg" fontSize={16}>Number of words</Typography>
                    <Slider
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
                <Button
                    variant="soft"
                    color="neutral"
                    endDecorator={<KeyboardArrowRight/>}
                >
                    Start now
                </Button>
            </CardActions>
        </Card>
    );
};

export default RandomWords;