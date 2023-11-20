import React, { useRef, useEffect } from "react";
import { getDocument } from "pdfjs-dist/webpack";
import useDrawFirstPDFPage from "./hooks/useDrawFirstPDFPage";

function PDFViewer() {
  const fileRef = useRef();
  const canvasRef = useRef();
  useDrawFirstPDFPage(fileRef, canvasRef);

  return (
    <div>
      <input type="file" ref={fileRef} accept=".pdf" />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default PDFViewer;
