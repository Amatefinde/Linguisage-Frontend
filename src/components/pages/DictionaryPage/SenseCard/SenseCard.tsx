import React, {useEffect, useRef, useState} from 'react';
import {IUserSense} from "../../../../types/UserSensesInterface.ts";
import Divider from '@mui/joy/Divider';
import Typography from "@mui/joy/Typography";
import {Card, IconButton, List, ListItem} from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import ImageCarousel from "./ImageCarousel/ImageCarousel.tsx";
import ChipSheet from "./ChipSheet/ChipSheet";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import classes from "./SenseCard.module.css"

interface SenseCardInterface {
    sense: IUserSense;
}



const SenseCard: React.FC<SenseCardInterface> = ({sense}) => {
    const componentRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (componentRef.current) {
            const { width, height } = componentRef.current.getBoundingClientRect();
            setDimensions({ width, height });
        }
    }, []);

    return (
        <Card size="lg" variant="soft" sx={{borderRadius: 20, position: "relative"}}>
            <Sheet ref={componentRef} variant={"soft"} sx={{display: "flex", alignItems: "center", gridGap: "25px"}}>
                <Card size="sm" sx={{width: "60%", borderRadius: 0}} variant={"soft"}>
                    <ChipSheet sense={sense}/>
                    <Typography level="h2" sx={{display: "flex", justifyContent: "space-between"}}>
                        {sense.word.word}

                    </Typography>
                    <Typography level="title-lg" textColor="text.tertiary" sx={{margin: "0 0 10px 0"}}>
                        {sense.definition}
                    </Typography>
                    <Divider inset="none"/>
                    <List size="sm" sx={{mx: '10px'}}>
                        {sense.examples.slice(0, 3).map(example =>
                            <ListItem key={sense.id}>
                                <div dangerouslySetInnerHTML={{__html: example.html_example}}></div>
                            </ListItem>
                        )}
                    </List>
                </Card>
                <div style={{marginRight: "20px"}}>
                <ImageCarousel images={sense.word_images} height={dimensions.height}/>
                </div>
                <div className={classes.mofifyBlock}>
                    <IconButton size={"sm"}><MoreVertRoundedIcon/></IconButton>
                </div>
            </Sheet>
        </Card>
    );
};

export default SenseCard;