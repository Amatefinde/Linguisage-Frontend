import React, {useState} from 'react';
import classes from "./AddWord.module.css"
import Sheet from "@mui/joy/Sheet";
import {IWordData} from "../../../types/WordInterface";
import SenseList from "./SenseList/SenseList.tsx";
import Search, {TWordError} from "./Search/Search";
import ImageList from "./ImageListStyled/ImageList";
import Pronunciation from "./Pronunciation/Pronunciation";
import CircularProgress from '@mui/joy/CircularProgress';
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import {Tooltip} from "@mui/joy";
import ManageBlock from "./ManageBlock/ManageBlock.tsx";
import {AddErrorType} from "./AddErrorEnum.ts";


interface AddWordInterface {
    defaultQuery?: string;
    onClose: () => void;
}


const AddWord: React.FC<AddWordInterface> = ({onClose, defaultQuery = ""}) => {
    const [wordError, setWordError] = useState<TWordError>(null)
    const [wordData, setWordData] = useState<IWordData | null>(null)
    const [pickedFSenseId, setPickedFSenseId] = useState<number | null>(null)
    const [pickedFImageIds, setPickedFSenseIds] = useState<number[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [addError, setAddError] = useState<AddErrorType>(null)

    return (
        <Sheet className={classes.container} sx={{padding: "15px", border: "none"}}>
            <Sheet sx={{
                width: 300,
                border: "none",
                gap: 2,
                display: "flex",
                flexDirection: "column",
                overflow: "visible"
            }}>
                <Search
                    setWordData={setWordData}
                    defaultQuery={defaultQuery}
                    setWordError={setWordError}
                    setIsLoading={setIsLoading}
                />

                {wordData?.word && !isLoading &&
                    <>
                        <Pronunciation wordData={wordData}/>
                        < SenseList
                            wordData={wordData}
                            setAddError={setAddError}
                            pickedFSenseId={pickedFSenseId}
                            setPickedFSenseId={setPickedFSenseId}
                        />
                    </>
                }

            </Sheet>
            {wordData?.word_images && !isLoading &&
                <div className={classes.imagesWrapper}>
                    <ImageList
                        wordData={wordData}
                        pickedFImageIds={pickedFImageIds}
                        setPickedFSenseIds={setPickedFSenseIds}
                    />
                    <ManageBlock setAddError={setAddError} pickedFSenseId={pickedFSenseId} pickedFImageIds={pickedFImageIds} onClose={onClose} addError={addError} setWordData={setWordData}/>
                </div>
            }

            {wordError === "NOT_FOUND" &&
                <div className={classes.errorMessage}>Sorry, we don't have info about this word.
                    But if this word exists, we already try to search info about it. You may try again after several
                    tens of seconds.
                </div>}
            {wordError === "OTHER" &&
                <div className={classes.errorMessage} style={{textAlign: "center", textIndent: 0}}>Sorry, but something
                    go wrong...
                </div>}
            {isLoading &&
                <div className={classes.errorMessage} style={{textAlign: "center", textIndent: 0}}><CircularProgress
                    size="lg"/>
                </div>}
            {!wordData && !wordError && !isLoading &&
                <div className={classes.errorMessage} style={{textAlign: "center", textIndent: 0}}></div>}
        </Sheet>
    );
};


export default AddWord;