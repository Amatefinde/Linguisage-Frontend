import React from 'react';
import {IWordImage} from "../../../../../types/WordInterface.ts";
import classes from "./ImageColumn.module.css"

interface ImageColumnInterface {
    images: IWordImage[];
    pickedFImageIds: number[];
    setPickedFSenseIds: (value: number[]) => void;
}

const ImageColumn: React.FC<ImageColumnInterface> = ({images, pickedFImageIds, setPickedFSenseIds}) => {

    function handleImageCLick(fImgID: number) {
        if (pickedFImageIds.includes(fImgID)) {
            setPickedFSenseIds(e => [...e].filter(e => e !== fImgID))
        } else {
            setPickedFSenseIds(e => [...e, fImgID])
        }
    }

    return (
        <div className={classes.imageColumn}>
            {images.map(image => <img
                style={{
                    outline: pickedFImageIds.includes(image.f_image_id) ? "solid 7px #cddff7" : "solid 5px #F0F4F8",
                }}
                key={image.f_image_id}
                src={image.img}
                onClick={() => handleImageCLick(image.f_image_id)}
                className={classes.image}
            />)}
        </div>
    );
};

export default ImageColumn;