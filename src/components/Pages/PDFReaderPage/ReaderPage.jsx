import React, { useContext } from "react";
import { VariableSizeList as List } from "react-window";
import classes from "./ReaderPage.module.css";
import Header from "../../Blocks/Header/Header";
import { ApplicationContext } from "../../../App";
import SingleImageCanvas from "./SingleImageCanvas/SingleImageCanvas";
import useZoom from "../../../hooks/useZoom";
import AutoSizer from "react-virtualized-auto-sizer";

const ReaderPage = () => {
  const { currentBookAllPages, setCurrentBookAllPages } =
    useContext(ApplicationContext);

  const scale = useZoom();

  function getItemSize(idx) {
    const obj = currentBookAllPages[idx];
    const scaleFactor = scale / parseInt(obj.text_info.pageWidth);
    const value = Math.round(obj.text_info.pageHeight * scaleFactor);
    return value + Math.round(scale / 60);
  }

  const Row = ({ index, style }) => (
    <div style={style}>
      <div
        className={classes.pageWrapper}
        style={{ width: scale, margin: `${Math.round(scale / 60)}px auto` }}
      >
        <SingleImageCanvas
          key={currentBookAllPages[index].number_page}
          obj={currentBookAllPages[index]}
          scale={scale}
        />
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            key={scale}
            height={window.innerHeight - 100}
            width={width}
            itemCount={currentBookAllPages.length}
            itemSize={getItemSize}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </>
  );
};

export default ReaderPage;
