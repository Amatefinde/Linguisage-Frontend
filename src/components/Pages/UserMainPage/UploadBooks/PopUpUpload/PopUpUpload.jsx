import React, { useState } from "react";
import classes from "./PopUpUpload.module.css";
import InputField from "../../../../ui/InputField/InputField";
import AccentButton from "../../../../ui/Buttons/AccentButton/AccentButton";

const PopUpUpload = ({ file, setFile, canvasRef, callback }) => {
  const [fileName, setFileName] = useState("");
  return (
    <div className={classes.wrapper}>
      <div className={classes.bookCover}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className={classes.options}>
        <InputField text={file?.text && fileName} setText={setFileName} />
        <label>
          <div className={classes.checkbox}>
            <input type="checkbox" />
            <div className="unimportantFont">Recognize text automatically</div>
          </div>
        </label>
        <AccentButton onClick={callback}>Upload</AccentButton>
      </div>
    </div>
  );
};

export default PopUpUpload;
