import React, { useContext, useRef, useState } from "react";
import classes from "./SingleImageCanvas.module.css";
import useImage from "./useImage";
import { ApplicationContext } from "../../../../App";

const SingleImageCanvas = ({ obj, scale, setModalActive }) => {
  const drawingCanvasRef = useRef(null);

  const { img, imgStyle } = useImage(
    drawingCanvasRef,
    obj,
    scale,
    setModalActive,
  );

  return (
    <>
      <div className={classes.canvasWrapper} id={"page" + obj.number_page}>
        <img src={img?.src} style={imgStyle}></img>
        <canvas ref={drawingCanvasRef} className={classes.drawingCanvas} />
      </div>
    </>
  );
};

export default SingleImageCanvas;
