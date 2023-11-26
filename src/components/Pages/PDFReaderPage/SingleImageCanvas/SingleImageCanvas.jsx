import React, { useEffect, useRef, useState } from "react";
import classes from "./SingleImageCanvas.module.css";
import WordDrawer from "../../../../services/WordService";
import WordSelector from "./WordSelector";
import Modal from "../../../ui/Modal/Modal";
import AddWord from "../../../Blocks/AddWord/AddWord";

const SingleImageCanvas = ({
  obj,
  scale,
  modalActive,
  setModalActive,
  currentWord,
  setCurrentWord,
}) => {
  const drawingCanvasRef = useRef(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const [isWordMenuActive, setIsWordMenuActive] = useState(false);
  const [popupBottomPositon, setpopupBottomPosition] = useState({
    x: undefined,
    y: undefined,
  });
  const [img, setImg] = useState(undefined);
  const [imgStyle, setImageStyle] = useState({});

  useEffect(() => {
    // const imageCanvas = imageCanvasRef.current;
    const drawingCanvas = drawingCanvasRef.current;
    // const imgCtx = imageCanvas.getContext("2d");

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
        setpopupBottomPosition,
        setCurrentWord,
      );
    };
  }, []);

  const wordMenu = (
    <div
      className={classes.wordMenu}
      style={{
        left: `${popupBottomPositon.x - 75}px`,
        top: `${popupBottomPositon.y - 40}px`,
      }}
    >
      <div
        className={classes.learnThis}
        onClick={() => {
          setModalActive(true);
        }}
      >
        Learn this
      </div>
    </div>
  );

  return (
    <>
      <div className={classes.canvasWrapper} id={"page" + obj.number_page}>
        {popupBottomPositon.x && wordMenu}
        <img src={img?.src} style={imgStyle}></img>
        {/*<canvas ref={imageCanvasRef} className={classes.imageCanvas} />*/}
        <canvas ref={drawingCanvasRef} className={classes.drawingCanvas} />
      </div>
    </>
  );
};

export default SingleImageCanvas;
