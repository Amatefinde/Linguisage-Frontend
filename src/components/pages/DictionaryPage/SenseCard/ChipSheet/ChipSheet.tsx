import Chip from "@mui/joy/Chip";
import {VolumeUpRounded} from "@mui/icons-material";
import Sheet from "@mui/joy/Sheet";
import React from "react";
import {IUserSense} from "../../../../../types/UserSensesInterface";
import classes from "./ChipSheet.module.css"

interface ChipSheetInterface {
    sense: IUserSense;
}
const ChipSheet: React.FC<ChipSheetInterface> = ({sense}) => {
    const playAudio = (soundUrl: string) => {
        const audio = new Audio(soundUrl);
        audio.play();
    };
    return (
        <Sheet variant={"soft"} className={classes.chips}>
            {sense.word.sound_us && <Chip onClick={() => playAudio(sense.word.sound_us)} size="sm" variant="soft" color="primary" startDecorator={<VolumeUpRounded/>}>
                American
            </Chip>}
            {sense.word.sound_uk && <Chip onClick={() => playAudio(sense.word.sound_uk)} size="sm" variant="soft" color="primary" startDecorator={<VolumeUpRounded/>}>
                British
            </Chip>}
            {sense.part_of_speech && <Chip size="sm" variant="plain" color="primary">
                {sense.part_of_speech}
            </Chip>}
            {sense.lvl && <Chip size="sm" variant="plain" color="primary">
                {sense.lvl}
            </Chip>}
        </Sheet>
    );
};

export default ChipSheet;