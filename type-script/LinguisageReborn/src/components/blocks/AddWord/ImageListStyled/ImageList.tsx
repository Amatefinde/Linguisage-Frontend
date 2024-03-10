import classes from "./ImageList.module.css"
import {IWordData} from "../../../../types/WordInterface.ts";
import React from "react";
import splitArrayInHalf from "../../../../utils/splitArrayInHalf.ts";
import ImageColumn from "./ImageColumn/ImageColumn.tsx";


interface ImageListInterface {
    wordData: IWordData;
    pickedFImageIds: number[];
    setPickedFSenseIds: (value: number[]) => void;
}

const ImageList: React.FC<ImageListInterface> = ({wordData, pickedFImageIds, setPickedFSenseIds}) => {
    const [leftImages, rightImages] = splitArrayInHalf<IWordData>(wordData.word_images)

    return (
        <div className={classes.imageList}>
            <ImageColumn images={leftImages} pickedFImageIds={pickedFImageIds} setPickedFSenseIds={setPickedFSenseIds}/>
            <ImageColumn images={rightImages} pickedFImageIds={pickedFImageIds} setPickedFSenseIds={setPickedFSenseIds}/>
        </div>
    )
        ;
};

export default ImageList;