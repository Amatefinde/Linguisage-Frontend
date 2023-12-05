import React, { useContext } from "react";
import classes from "./ImagesList.module.css";
import Image from "./Image/Image";
import ImageColumn from "./ImageColumn/ImageColumn";
import splitListByIndex from "../../../../utils/splitListByIndex";
import { ActiveImagesContext } from "../AddWord";

const ImagesList = ({ wordContent, activeSenseId }) => {
  let left_images;
  let right_images;
  let images_or_error;

  const images = wordContent?.senses?.filter(
    (sense) => sense.id === activeSenseId,
  )[0]?.images;

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
  return <div className={classes.imageList}>{images_or_error}</div>;
};

export default ImagesList;
