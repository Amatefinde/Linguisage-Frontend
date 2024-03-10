import React, { ReactNode } from 'react';
import { VolumeUpRounded } from "@mui/icons-material";
import { Button } from "@mui/joy";
import classes from "./PronunciationOption.module.css";
import {SxProps} from "@mui/joy/styles/types/theme";

interface PronunciationOptionProps {
    children: ReactNode;
    sound: string;
}

const PronunciationOption: React.FC<PronunciationOptionProps> = ({ children, sound }) => {
    const sx: SxProps = { borderRadius: 20 }; // Replace with your specific styling

    const playAudio = () => {
        const audio = new Audio(sound);
        audio.play();
    };

    return (
        <Button startDecorator={<VolumeUpRounded />} onClick={playAudio} className={classes.pronunciationButton} sx={sx} color={"neutral"} variant="soft">
            {children}
        </Button>
    );
};

export default PronunciationOption;
