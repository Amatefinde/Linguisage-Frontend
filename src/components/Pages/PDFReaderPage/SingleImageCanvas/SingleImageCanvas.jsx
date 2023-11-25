import React, { useEffect, useRef } from "react";
import classes from "./SingleImageCanvas.module.css";
import WordDrawer from "../../../../services/WordService";
import WordSelector from "./WordSelector";

const SingleImageCanvas = ({ obj, scale }) => {
  const imageCanvasRef = useRef(null);
  const drawingCanvasRef = useRef(null);

  useEffect(() => {
    const imageCanvas = imageCanvasRef.current;
    const drawingCanvas = drawingCanvasRef.current;
    const imgCtx = imageCanvas.getContext("2d");

    const img = new Image();
    img.src = obj.img;
    img.onload = () => {
      const scaleFactor = scale / img.width;
      const imgHeight = Math.round(img.height * scaleFactor);

      imageCanvas.width = scale;
      drawingCanvas.width = scale;
      imageCanvas.height = imgHeight;
      drawingCanvas.height = imgHeight;

      imgCtx.drawImage(img, 0, 0, scale, imgHeight);
      new WordSelector(drawingCanvas, obj, scaleFactor);
    };
  }, [obj, scale]);

  return (
    <div className={classes.canvasWrapper} id={"page" + obj.number_page}>
      <canvas ref={imageCanvasRef} className={classes.imageCanvas} />
      <canvas ref={drawingCanvasRef} className={classes.drawingCanvas} />
    </div>
  );
};

export default SingleImageCanvas;
