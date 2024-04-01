import Chip, {ChipPropsColorOverrides} from "@mui/joy/Chip";
import {VolumeUpRounded} from "@mui/icons-material";
import Sheet from "@mui/joy/Sheet";
import React from "react";
import {IUserSense} from "../../../../../types/UserSensesInterface";
import classes from "./ChipSheet.module.css"
import {IconButton} from "@mui/joy";
import {OverridableStringUnion} from "@mui/types";
import {ColorPaletteProp, VariantProp} from "@mui/joy/styles/types";
import {SheetPropsVariantOverrides} from "@mui/joy/Sheet/SheetProps";
import WordSoundBlock from "../../../../blocks/WordSoundBlock/WordSoundBlock.tsx";

interface ChipSheetInterface {
    sense: IUserSense;
    variant?: OverridableStringUnion<VariantProp, SheetPropsVariantOverrides>;
}
const ChipSheet: React.FC<ChipSheetInterface> = ({sense, variant = "soft"}) => {
    const playAudio = (soundUrl: string) => {
        const audio = new Audio(soundUrl);
        audio.play();
    };

    let statusColor: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides>;
    if (sense.status === "in_process") {
        statusColor = "warning";
    } else if (sense.status === "complete") {
        statusColor = "success";
    } else {
        statusColor = "neutral";
    }

    return (
        <Sheet variant={variant} className={classes.chips}>
            <WordSoundBlock sense={sense}/>
            {sense.part_of_speech && <Chip size="sm" variant={variant == "plain" ? "soft" : "plain"} color={variant == "plain" ? "neutral" : "primary"}>
                {sense.part_of_speech}
            </Chip>}
            {sense.lvl && <Chip size="sm" variant={variant == "plain" ? "soft" : "plain"} color={variant == "plain" ? "neutral" : "primary"}>
                {sense.lvl}
            </Chip>}
            <Chip size="sm" variant={"solid"} color={statusColor}>
                {sense.status}
            </Chip>
        </Sheet>
    );
};

export default ChipSheet;