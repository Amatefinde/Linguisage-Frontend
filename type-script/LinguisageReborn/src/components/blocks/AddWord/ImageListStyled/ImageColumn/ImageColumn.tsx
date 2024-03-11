import React from 'react';
import {IWordImage} from "../../../../../types/WordInterface.ts";
import classes from "./ImageColumn.module.css"
import ImageComponent from "../ImageComponent/ImageComponent.tsx";

interface ImageColumnInterface {
    images: IWordImage[];
    pickedFImageIds: number[];
    setPickedFSenseIds: (value: number[]) => void;
}

const ImageColumn: React.FC<ImageColumnInterface> = ({images, pickedFImageIds, setPickedFSenseIds}) => {


    return (
        <div className={classes.imageColumn}>
            {images.map(image =>
                <ImageComponent
                    key={image.f_image_id}
                    pickedFImageIds={pickedFImageIds}
                    image={image}
                    setPickedFSenseIds={setPickedFSenseIds}
                />
            )}

        </div>
    );
};

export default ImageColumn;