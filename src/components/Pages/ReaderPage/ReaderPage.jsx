import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./ReaderPage.module.css";
import Header from "../../Blocks/Header/Header";
import { ApplicationContext } from "../../../App";
import SingleImageCanvas from "./SingleImageCanvas/SingleImageCanvas";
import useZoom from "../../hooks/useZoom";

const ReaderPage = () => {
  const { currentBookPages, setCurrentBookPages } =
    useContext(ApplicationContext);

  const imageLinks = currentBookPages.map((obj) => obj.img);

  const scale = useZoom();
  return (
    <>
      <Header />
      <div className={classes.pageWrapper} style={{ width: scale }}>
        {imageLinks.map((link, index) => (
          <SingleImageCanvas key={index} link={link} scale={scale} />
        ))}
      </div>
    </>
  );
};

export default ReaderPage;
