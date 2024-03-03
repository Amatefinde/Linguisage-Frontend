import React, { useState } from "react";
import classes from "./PopUpUpload.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import {Checkbox} from "@mui/joy";


const PopUpUpload = ({ file, fileName, setFileName }) => {
  
  return (
    <div className={classes.wrapper}>
      <div className={classes.bookCover}>
      </div>
      <div className={classes.management}>
        <Input value={file?.text && fileName} onChange={e => setFileName(e)} />
          <Checkbox label="Recognize text automatically"/>
          <Button variant={"solid"}>Upload</Button>
      </div>
    </div>
  );
};

export default PopUpUpload;
