import React from "react";
import classes from "./ImageColumn.module.css";
import Image from "../Image/Image";

const ImageColumn = ({ images }) => {
  return (
    <div className={classes.columnWrapper}>
      {images.map((image, idx, images) => (
        <Image key={image.id} images={images} imageId={image.id} />
      ))}
    </div>
  );
};

export default ImageColumn;
