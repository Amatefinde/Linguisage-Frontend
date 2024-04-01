import React from 'react';
import {Box} from "@mui/joy";
import Chip from "@mui/joy/Chip";
import {VolumeUpRounded} from "@mui/icons-material";
import {IUserSense} from "../../../types/UserSensesInterface.ts";

interface IWordSoundBlockProps {
    sense: IUserSense;
}
const WordSoundBlock: React.FC<IWordSoundBlockProps> = ({sense}) => {
    const playAudio = (soundUrl: string) => {
        const audio = new Audio(soundUrl);
        audio.play();
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {sense.word.sound_us && <Chip onClick={() => playAudio(sense.word.sound_us)} size="sm" variant="soft" color="primary" startDecorator={<VolumeUpRounded/>}>
                American
            </Chip>}
            {sense.word.sound_uk && <Chip onClick={() => playAudio(sense.word.sound_uk)} size="sm" variant="soft" color="primary" startDecorator={<VolumeUpRounded/>}>
                British
            </Chip>}
        </Box>
    );
};

export default WordSoundBlock;