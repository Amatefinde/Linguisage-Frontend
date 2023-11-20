import React, { useState } from "react";
import classes from "./PopUpUpload.module.css";
import InputField from "../../../../ui/InputField/InputField";
import AccentButton from "../../../../ui/Buttons/AccentButton/AccentButton";
import SkeletonButton from "../../../../ui/Buttons/Button/SkeletonButton";
import YellowButton from "../../../../ui/Buttons/YellowButton/YellowButton";
import BookService from "../../../../../services/BookService";

// async function renderPDF(pdfData) {
//   // Fetch the PDF file
//
//   // Load the PDF data using PDF.js
//   const pdf = await pdfjsLib.getDocument(pdfData).promise;
//
//   // Get the first page
//   const pageNumber = 1;
//   const page = await pdf.getPage(pageNumber);
//
//   // Set the scale for rendering (you can adjust it as needed)
//   const scale = 1.5;
//
//   // Get the viewport of the page at the specified scale
//   const viewport = page.getViewport({ scale });
//
//   // Set the canvas size to match the viewport
//   canvas.width = viewport.width;
//   canvas.height = viewport.height;
//
//   // Get the rendering context of the canvas
//   const context = canvas.getContext("2d");
//
//   // Render the first page to the canvas
//   const renderContext = {
//     canvasContext: context,
//     viewport: viewport,
//   };
//   await page.render(renderContext).promise;
// }

const PopUpUpload = ({ file, setFile, canvasRef, callback }) => {
  const [fileName, setFileName] = useState(file?.text);
  return (
    <div className={classes.wrapper}>
      <div className={classes.bookCover}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className={classes.options}>
        <InputField text={fileName} setText={setFileName} />
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
