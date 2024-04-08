import React from "react";
import OneSizeBlock from "../OneSizeBlock/OneSizeBlock.js";
import {IUserSense} from "../../../../../types/UserSensesInterface";
import Typography from "@mui/joy/Typography";
import Divider from '@mui/joy/Divider';
import ChipSheet from "../../../DictionaryPage/SenseCard/ChipSheet/ChipSheet.tsx";
import WordSoundBlock from "../../../../blocks/WordSoundBlock/WordSoundBlock.tsx";

interface WordCardInterface {
    sense: IUserSense;
}

const WordCard: React.FC<WordCardInterface> = ({sense}) => {
    return (
        <OneSizeBlock>
            <WordSoundBlock sense={sense}/>
            <Typography level="h2">{sense.word.word}</Typography>
            <Divider inset="none" />
            {sense.definition}
            {sense.definition.length < 100 && !!sense.examples.length && sense.examples?.[0]?.example?.length + sense.definition.length < 147 && (
                <>
                    <Divider inset="none" />
                    {/*<WrapText>*/}
                    <div dangerouslySetInnerHTML={{__html: sense.examples?.[0]?.html_example}}></div>
                    {/*</WrapText>*/}
                </>
            )}
        </OneSizeBlock>
    );
};

export default WordCard;
