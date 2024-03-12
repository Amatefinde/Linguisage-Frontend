import React from 'react';
import {IUserSense} from "../../../../types/UserSensesInterface.ts";
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Typography from "@mui/joy/Typography";
import {Card, List} from "@mui/joy";
import ListItem from '@mui/joy/ListItem';
import Sheet from "@mui/joy/Sheet";
import classes from "./SenseCard.module.css"
import ImageCarousel from "./ImageCarousel/ImageCarousel.tsx";

interface SenseCardInterface {
    sense: IUserSense;
}

const SenseCard: React.FC<SenseCardInterface> = ({sense}) => {
    console.log(sense.lvl)
    return (
        <Card size="lg" variant="soft" sx={{borderRadius: 20}}>
            <Sheet variant={"plain"} sx={{display: "flex"}}>
            <Card size="sm" sx={{width: "60%", borderRadius: 0}} variant={"soft"}>
                <Sheet variant={"soft"} className={classes.chips}>
                    {sense.part_of_speech && <Chip size="sm" variant="soft" color="primary">
                        {sense.part_of_speech}
                    </Chip>}
                    {sense.lvl && <Chip size="sm" variant="soft" color="primary">
                        {sense.lvl}
                    </Chip>}
                </Sheet>
                <Typography level="h2">{sense.word.word}</Typography>
                <Typography level="title-lg" textColor="text.tertiary" sx={{margin: "0 0 10px 0"}}>
                    {sense.definition}
                </Typography>
                <Divider inset="none"/>
                <List size="sm" sx={{mx: '10px'}}>
                    {sense.examples.slice(0, 3).map(example =>
                        <ListItem>
                            <div dangerouslySetInnerHTML={{__html: example.html_example}}></div>
                        </ListItem>
                    )}
                </List>
            </Card>

            <ImageCarousel images={sense.word_images}/>
            </Sheet>
        </Card>
    );
};

export default SenseCard;