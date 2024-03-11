import React, {useState} from 'react';
import {AspectRatio, Skeleton} from "@mui/joy";
import classes from "./ImageComponent.module.css"
import {IWordImage} from "../../../../../types/WordInterface.ts";


interface ImageInterface {
    image: IWordImage;
    pickedFImageIds: number[];
    setPickedFSenseIds: (value: number[]) => void;
}

const ImageComponent: React.FC<ImageInterface> = ({image, pickedFImageIds, setPickedFSenseIds}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);


    function handleImageCLick(fImgID: number) {
        if (pickedFImageIds.includes(fImgID)) {
            setPickedFSenseIds(e => [...e].filter(e => e !== fImgID))
        } else {
            setPickedFSenseIds(e => [...e, fImgID])
        }
    }



    let img = new Image();
    img.src = image.img;
    img.onload = function () {
        setIsLoading(false)
    };
    img.onerror = function () {
        setIsLoading(false)
    };


    return (
        <div style={{
            outline: !isLoading && (pickedFImageIds.includes(image.f_image_id) ? "solid 7px #cddff7" : "solid 5px #F0F4F8"),
        }}
             className={classes.imageWrapper}
        >
        <AspectRatio variant={"plain"} ratio={isLoading ? Math.random() / 2 + 0.75 : `${img.width}/${img.height}`} key={image.f_image_id}>
            <Skeleton loading={isLoading} variant="overlay">
                <img
                    src={img.src}
                    onClick={() => handleImageCLick(image.f_image_id)}
                    className={classes.image}
                />
            </Skeleton>
        </AspectRatio>
        </div>
    );
};

export default ImageComponent;