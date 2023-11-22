import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./ReaderPage.module.css";
import Header from "../../Blocks/Header/Header";
import { ApplicationContext } from "../../../App";
import SingleImageCanvas from "./SingleImageCanvas/SingleImageCanvas";
import useZoom from "../../../hooks/useZoom";
import InputField from "../../ui/InputField/InputField";

const ReaderPage = () => {
  const { currentBookAllPages, setCurrentBookAllPages } =
    useContext(ApplicationContext);
  const [offset, setOffset] = useState(0);
  const [currentPages, setCurrentPages] = useState(
    currentBookAllPages.slice(0, 12),
  );

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (fetching) {
      setCurrentPages(currentBookAllPages.slice(offset, offset + 12));
      setFetching(false);
    }
  }, [offset]);

  const [lastScrollTop, setLastScrollTop] = useState(0);
  useEffect(() => {
    function scrollHandler(e) {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const scrollTop = e.target.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      // Down  scroll
      if (scrollTop > lastScrollTop) {
        if (!fetching) {
          console.log("down");
          if (scrollTop > scrollHeight * 0.9) {
            if (offset + 12 < currentBookAllPages.length) {
              setOffset((prev) => prev + 4);
              setFetching(true);
            }
          }
        }
      } else {
        // Up scroll
        if (!fetching) {
          console.log("up");
          if (scrollTop < scrollHeight * 0.2) {
            if (offset >= 4) {
              setOffset((prev) => prev - 4);
              setFetching(true);
            }
          }
        }
      }
      setLastScrollTop(scrollTop);
    }

    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, [lastScrollTop]);
  const [toNumberPage, setToNumberPage] = useState("");

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
