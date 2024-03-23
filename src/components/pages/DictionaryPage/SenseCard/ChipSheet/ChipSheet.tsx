import Chip from "@mui/joy/Chip";
import {VolumeUpRounded} from "@mui/icons-material";
import Sheet from "@mui/joy/Sheet";
import React from "react";
import {IUserSense} from "../../../../../types/UserSensesInterface";
import classes from "./ChipSheet.module.css"
import {IconButton} from "@mui/joy";
import {OverridableStringUnion} from "@mui/types";
import {VariantProp} from "@mui/joy/styles/types";
import {SheetPropsVariantOverrides} from "@mui/joy/Sheet/SheetProps";

interface ChipSheetInterface {
    sense: IUserSense;
    variant?: OverridableStringUnion<VariantProp, SheetPropsVariantOverrides>;
}
const ChipSheet: React.FC<ChipSheetInterface> = ({sense, variant = "soft"}) => {
    const playAudio = (soundUrl: string) => {
        const audio = new Audio(soundUrl);
        audio.play();
    };
    return (
        <Sheet variant={variant} className={classes.chips}>
            {sense.word.sound_us && <Chip onClick={() => playAudio(sense.word.sound_us)} size="sm" variant="soft" color="primary" startDecorator={<VolumeUpRounded/>}>
                American
            </Chip>}
            {sense.word.sound_uk && <Chip onClick={() => playAudio(sense.word.sound_uk)} size="sm" variant="soft" color="primary" startDecorator={<VolumeUpRounded/>}>
                British
            </Chip>}
            {sense.part_of_speech && <Chip size="sm" variant={variant == "plain" ? "soft" : "plain"} color={variant == "plain" ? "neutral" : "primary"}>
                {sense.part_of_speech}
            </Chip>}
            {sense.lvl && <Chip size="sm" variant={variant == "plain" ? "soft" : "plain"} color={variant == "plain" ? "neutral" : "primary"}>
                {sense.lvl}
            </Chip>}
        </Sheet>
    );
};

export default ChipSheet;