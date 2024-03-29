import React from 'react';
import {Card, Tab, tabClasses, TabList, TabPanel, Tabs} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import {ISense} from "../../../../../types/WordInterface.ts";
import classes from "./Sense.module.css"
import "./Exampels.css"
import {AddErrorType, AddErrorEnum} from "../../AddErrorEnum.ts";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';


interface SenseInterface {
    sense: ISense;
    pickedFSenseId: number | null;
    setPickedFSenseId: (value: number| null) => void;
    setAddError: (value: AddErrorType) => void;
}

const Sense: React.FC<SenseInterface> = ({sense, pickedFSenseId, setPickedFSenseId, setAddError}) => {
    function handleClick() {
        if (pickedFSenseId !== sense.f_sense_id) {
            setPickedFSenseId(sense.f_sense_id)
            if (sense.in_user_dictionary) {
                setAddError(AddErrorEnum.already_have)
            } else {
                setAddError(null)
            }
        } else if (pickedFSenseId === sense.f_sense_id) {
            setPickedFSenseId(null)
            setAddError(AddErrorEnum.not_chosen)
        }
    }
    return (
<div style={{position: "relative"}}>
        <Card
            variant="soft"
            color={sense.f_sense_id == pickedFSenseId ? "primary" : "neutral"}
            sx={{'--Card-radius': `20px`, padding: 2.5, cursor: "pointer"}}
            onClick={handleClick}
        >
            {sense.in_user_dictionary && <div className={classes.alreadyHave}><CheckCircleOutlineRoundedIcon/></div>}
            {sense.short_cut && <Typography color={sense.f_sense_id == pickedFSenseId ? "primary" : "neutral"} level="title-lg">{sense.short_cut}</Typography>}
            <Typography level="body-sm">{[sense.part_of_speech, sense.lvl].filter(e => !!e).join(", ")}</Typography>
            <Tabs aria-label="tabs" defaultValue={0} sx={{bgcolor: 'transparent'}}>
                <div onClick={e => e.stopPropagation()}>
                    <TabList
                        color={sense.f_sense_id == pickedFSenseId ? "primary" : "neutral"}
                        disableUnderline
                        sx={{
                            p: 0.2,
                            width: "100%",
                            gap: 2,
                            borderRadius: 'xl',
                            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                boxShadow: 'sm',
                            },
                        }}
                    >
                        <Tab color={sense.f_sense_id == pickedFSenseId ? "primary" : "neutral"} sx={{width: "50%"}} disableIndicator>Definition</Tab>
                        <Tab disabled={!sense.examples.length} color={sense.f_sense_id == pickedFSenseId ? "primary" : "neutral"} sx={{width: "50%"}} disableIndicator>Examples</Tab>
                    </TabList>
                </div>
                <TabPanel value={0} sx={{padding: 0, margin: 0, marginTop: 1}}>
                    {sense.definition}
                </TabPanel>
                <TabPanel value={1} sx={{padding: 1, margin: 0, marginTop: 0}}>
                    {sense.examples.map(example => <div key={example.id}
                        dangerouslySetInnerHTML={{__html: example.html_example.replace(`"`, ``)}}></div>)}
                </TabPanel>
            </Tabs>
        </Card>
</div>
    );
};

export default Sense;