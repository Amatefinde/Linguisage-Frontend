import React from "react";
import classes from "./Image.module.css";

const Image = ({ images, activeImagesId, setActiveImagesId, imageId }) => {
  const image = images.find((image) => image.id === imageId);

  return <img src={"http://" + image.img} className={classes.img} />;
};

export default Image;
