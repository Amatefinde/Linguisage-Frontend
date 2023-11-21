import React, { useEffect, useRef } from "react";
import classes from "./SingleImageCanvas.module.css";

const SingleImageCanvas = ({ link, scale }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;

    const img = new Image();
    img.src = link;
    img.onload = () => {
      const scaleFactor = scale / img.width;
      const imgHeight = img.height * scaleFactor;
      canvas.width = scale;
      canvas.height = imgHeight;
      context.drawImage(img, 0, 0, scale, Math.round(imgHeight));
    };
  }, [link, scale]);

  return (
    <div className={classes.canvasWrapper}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default SingleImageCanvas;
