import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./ReaderPage.module.css";
import Header from "../../Blocks/Header/Header";
import { ApplicationContext } from "../../../App";
import SingleImageCanvas from "./SingleImageCanvas/SingleImageCanvas";
import useZoom from "../../../hooks/useZoom";
import InputField from "../../ui/InputField/InputField";
import useVirtualList from "../../../hooks/useVirtualList";

const ReaderPage = () => {
  const { currentBookAllPages, setCurrentBookAllPages } =
    useContext(ApplicationContext);

  const currentPages = useVirtualList(currentBookAllPages);

  const scale = useZoom();
  return (
    <>
      <Header />
      <div className={classes.pageWrapper} style={{ width: scale }}>
        {currentPages.map((obj) => (
          <SingleImageCanvas key={obj.number_page} obj={obj} scale={scale} />
        ))}
      </div>
    </>
  );
};

export default ReaderPage;
