import React, { useContext, useEffect, useState } from "react";
import WordSelector from "./WordSelector";
import { ApplicationContext } from "../../../../App";

const UseImage = (drawingCanvasRef, obj, scale, setModalActive) => {
  const [img, setImg] = useState(undefined);
  const [imgStyle, setImageStyle] = useState({});
  const { setCurrentWord, setCurrentContext } = useContext(ApplicationContext);

  useEffect(() => {
    const drawingCanvas = drawingCanvasRef.current;
    const img = new Image();
    img.src = obj.img;
    img.onload = () => {
      const scaleFactor = scale / img.width;
      const imgHeight = Math.round(img.height * scaleFactor);
      // imageCanvas.width = scale;
      drawingCanvas.width = scale;
      // imageCanvas.height = imgHeight;
      drawingCanvas.height = imgHeight;
      setImg(img);
      setImageStyle({ width: scale, height: imgHeight });

      // imgCtx.drawImage(img, 0, 0, scale, imgHeight);
      new WordSelector(
        drawingCanvas,
        obj,
        scaleFactor,
        setCurrentWord,
        setCurrentContext,
        setModalActive,
      );
    };
  }, []);
  return { img, imgStyle };
};

export default UseImage;
