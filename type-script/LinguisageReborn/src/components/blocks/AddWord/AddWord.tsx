import React, {useEffect, useState} from 'react';
import classes from "./AddWord.module.css"
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";
import SearchIcon from '@mui/icons-material/Search';
import WordService from "../../../http/services/WordService";
import {IWordData} from "../../../types/WordInterface";
import SenseList from "./SenseList/SenseList.tsx";
import Search from "./Search/Search.tsx";
import ImageList from "./ImageListStyled/ImageList.tsx";
import {Card} from "@mui/joy";


interface IAddWord {
    defaultQuery?: string;
}

const AddWord = ({defaultQuery = ""}) => {

    const [wordData, setWordData] = useState<IWordData | null | "not_found">(null)
    const [pickedFSenseId, setPickedFSenseId] = useState<number | null>(null)
    const [pickedFImageIds, setPickedFSenseIds] = useState<number[]>([])

    return (
        <Sheet className={classes.container} sx={{padding: "50px", border: "none"}}>
            <Sheet sx={{width: 300, border: "none", gap: 2, display: "flex", flexDirection: "column"}}>
                <Search setWordData={setWordData}/>
                <div style={{display: "flex"}}>
                    <Card/>
                    <Card/>
                </div>
                {wordData?.word && < SenseList
                    wordData={wordData}
                    pickedFSenseId={pickedFSenseId}
                    setPickedFSenseId={setPickedFSenseId}
                />}
            </Sheet>
            {wordData?.word_images &&
                <ImageList
                    wordData={wordData}
                    pickedFImageIds={pickedFImageIds}
                    setPickedFSenseIds={setPickedFSenseIds}
                />
            }
        </Sheet>
    );
};


export default AddWord;