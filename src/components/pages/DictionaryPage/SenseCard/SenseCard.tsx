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
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import WordService from "../../../../http/services/WordService.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../store";
import {removeUserSense} from "../../../../store/userSenses/userSensesSlice.ts";


interface SenseCardInterface {
    sense: IUserSense;
}

const SenseCard: React.FC<SenseCardInterface> = ({sense}) => {
    const componentRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (componentRef.current) {
            const { width, height } = componentRef.current.getBoundingClientRect();
            setDimensions({ width, height });
        }
    }, []);

    function removeSense() {
        WordService.deleteSense(sense.id)
        dispatch(removeUserSense(sense.id))
    }

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
                    <Dropdown>
                        <MenuButton
                            variant="plain"
                            size="sm"
                            sx={{ maxWidth: '32px', maxHeight: '32px', borderRadius: 10 }}
                        >
                            <IconButton size={"sm"} sx={{borderRadius: 10}} variant={"plain"}><MoreVertRoundedIcon/></IconButton>
                        </MenuButton>
                        <Menu
                            placement="bottom-end"
                            size="sm"
                            variant={"soft"}
                            sx={{
                                zIndex: '99999',
                                p: 0.7,
                                gap: 0,
                                '--ListItem-radius': '7px',
                                borderRadius: "10px"
                            }}
                        >
                            <MenuItem>
                                <EditRoundedIcon />
                                Edit
                            </MenuItem>
                            <MenuItem onClick={removeSense}>
                                <DeleteRoundedIcon />
                                Remove
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                </div>
            </Sheet>
        </Card>
    );
};

export default SenseCard;