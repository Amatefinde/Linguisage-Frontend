import React, { useContext } from "react";
import classes from "./Image.module.css";

import { ActiveImagesContext } from "../../AddWord";

const Image = ({ images, imageId }) => {
  const { activeImagesId, setActiveImagesId } = useContext(ActiveImagesContext);
  const image = images.find((image) => image.id === imageId);

  function imageClickHandler() {
    setActiveImagesId((e) => ({ ...e, [imageId]: !e?.[imageId] }));
    console.log(activeImagesId);
  }

  return (
    <div
      className={classes.wrapper}
      style={{
        border: activeImagesId?.[imageId]
          ? "5px #7EA2FF solid"
          : "5px #D4D4D4 solid",
      }}
    >
      <img
        src={"http://" + image.img}
        className={classes.img}
        onClick={imageClickHandler}
      />
    </div>
  );
};

export default Image;
