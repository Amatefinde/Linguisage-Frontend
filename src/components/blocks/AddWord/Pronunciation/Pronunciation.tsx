import React from 'react';
import classes from "./Pronunciation.module.css"
import {IWordData} from "../../../../types/WordInterface.ts";
import Button from "@mui/joy/Button";
import {VolumeUpRounded} from "@mui/icons-material";
import PronunciationOption from "./PronunciationOption/PronunciationOption.tsx";


interface PronunciationInterface {
    wordData: IWordData;
}


const Pronunciation: React.FC<PronunciationInterface> = ({wordData}) => {
    return (
        <div className={classes.pronunciationSheet}>
            <PronunciationOption sound={wordData.sound_us}>
                American
            </PronunciationOption>
            <PronunciationOption sound={wordData.sound_uk}>
                British
            </PronunciationOption>
        </div>

    );
};

export default Pronunciation;