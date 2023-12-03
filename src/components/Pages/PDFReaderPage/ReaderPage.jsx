import React, { useContext, useRef, useEffect, useState } from "react";
import { VariableSizeList as List } from "react-window";
import classes from "./ReaderPage.module.css";
import Header from "../../Blocks/Header/Header";
import { ApplicationContext } from "../../../App";
import SingleImageCanvas from "./SingleImageCanvas/SingleImageCanvas";
import useZoom from "../../../hooks/useZoom";
import AutoSizer from "react-virtualized-auto-sizer";
import AddWord from "../../Blocks/AddWord/AddWord";
import Modal from "../../ui/Modal/Modal";
import ModalFramer from "../../ui/ModalFramer/ModalFramer";

const ReaderPage = () => {
  const { currentBookAllPages, setCurrentBookAllPages } =
    useContext(ApplicationContext);

  // const scale = useZoom();
  let scale = useZoom();

  const listRef = useRef(); // создаем ссылку на список
  const [modalActive, setModalActive] = useState(false);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0); // перерассчитываем размеры элементов при изменении масштаба
    }
  }, [scale]);

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
          {...{
            setModalActive,
            modalActive,
            scale,
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <ModalFramer showModal={modalActive} setShowModal={setModalActive}>
        <AddWord />
      </ModalFramer>
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef} // используем ссылку на список
            className="List"
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
