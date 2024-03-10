import React, {useState} from 'react';
import classes from "./AddWord.module.css"
import Sheet from "@mui/joy/Sheet";
import {IWordData} from "../../../types/WordInterface";
import SenseList from "./SenseList/SenseList.tsx";
import Search, {TWordError} from "./Search/Search";
import ImageList from "./ImageListStyled/ImageList";
import Pronunciation from "./Pronunciation/Pronunciation";
import CircularProgress from '@mui/joy/CircularProgress';


interface AddWordInterface {
    defaultQuery?: string;
}


const AddWord: React.FC<AddWordInterface> = ({defaultQuery = ""}) => {
    const [wordError, setWordError] = useState<TWordError>(null)
    const [wordData, setWordData] = useState<IWordData | null>(null)
    const [pickedFSenseId, setPickedFSenseId] = useState<number | null>(null)
    const [pickedFImageIds, setPickedFSenseIds] = useState<number[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <Sheet className={classes.container} sx={{padding: "50px", border: "none"}}>
            <Sheet sx={{width: 300, border: "none", gap: 2, display: "flex", flexDirection: "column"}}>
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
                            pickedFSenseId={pickedFSenseId}
                            setPickedFSenseId={setPickedFSenseId}
                        />
                    </>
                }

            </Sheet>
            {wordData?.word_images  && !isLoading &&
                <ImageList
                    wordData={wordData}
                    pickedFImageIds={pickedFImageIds}
                    setPickedFSenseIds={setPickedFSenseIds}
                />
            }
            {wordError === "NOT_FOUND" && <div className={classes.errorMessage}>Sorry, we don't have info about this word.
                But if this word exists, we already try to search info about it. You may try again after several tens of seconds.
            </div>}
            {wordError === "OTHER" && <div className={classes.errorMessage} style={{textAlign: "center", textIndent: 0}}>Sorry, but something go wrong...
            </div>}
            {isLoading && <div className={classes.errorMessage} style={{textAlign: "center", textIndent: 0}}><CircularProgress size="lg" />
            </div>}
        </Sheet>
    );
};


export default AddWord;