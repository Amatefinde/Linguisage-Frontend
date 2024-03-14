import React from 'react';
import {IUserSense} from "../../../../types/UserSensesInterface.ts";
import Divider from '@mui/joy/Divider';
import Typography from "@mui/joy/Typography";
import {Card, List} from "@mui/joy";
import ListItem from '@mui/joy/ListItem';
import Sheet from "@mui/joy/Sheet";
import ImageCarousel from "./ImageCarousel/ImageCarousel.tsx";
import ChipSheet from "./ChipSheet/ChipSheet";

interface SenseCardInterface {
    sense: IUserSense;
}

const SenseCard: React.FC<SenseCardInterface> = ({sense}) => {

    return (
        <Card size="lg" variant="soft" sx={{borderRadius: 20}}>
            <Sheet variant={"soft"} sx={{display: "flex", alignItems: "center", gridGap: "25px"}}>
                <Card size="sm" sx={{width: "60%", borderRadius: 0}} variant={"soft"}>
                    <ChipSheet sense={sense}/>
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