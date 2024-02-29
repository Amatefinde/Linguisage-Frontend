import React, {useContext} from "react";
import classes from "./ImagesList.module.css";
import Image from "./Image/Image";
import ImageColumn from "./ImageColumn/ImageColumn";
import splitListByIndex from "../../../../utils/splitListByIndex";
import {ActiveImagesContext} from "../AddWord";
import {get_sense_from_wordContent_by_id} from "../utils";

const ImagesList = ({wordContent, activeSenseId}) => {
    let left_images;
    let right_images;
    let images_or_error;

    const images = get_sense_from_wordContent_by_id(wordContent, activeSenseId)?.images

    if (images) {
        [left_images, right_images] = splitListByIndex(images);
        images_or_error = (
            <>
                <ImageColumn images={left_images}></ImageColumn>
                <ImageColumn images={right_images}></ImageColumn>
            </>
        );
    } else {
        images_or_error = <h3>Not found 404</h3>;
    }
    return (
        <div>
            <div className={classes.imageList}>{images_or_error}</div>
            <div className={classes.separator}></div>
        </div>);
};

export default ImagesList;
