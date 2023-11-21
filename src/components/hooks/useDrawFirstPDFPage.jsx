import React, { useRef, useEffect } from "react";
import { getDocument } from "pdfjs-dist/webpack";

export default function useDrawFirstPDFPage(
  inputFileRef,
  canvasRef,
  canvasWidth = 150,
  canvasHeight = 250,
) {
  function helper() {
    const file = this.files[0];

    const fileReader = new FileReader();
    fileReader.onload = function () {
      const typedarray = new Uint8Array(this.result);
      getDocument(typedarray).promise.then(function (pdf) {
        pdf.getPage(1).then(function (page) {
          const viewport = page.getViewport({ scale: 1 });
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          // Установите размер холста

          canvas.width = canvasWidth;
          canvas.height = canvasHeight;

          // Вычислите масштаб, сохраняя соотношение сторон
          const scale = Math.min(
            canvasWidth / viewport.width,
            canvasHeight / viewport.height,
          );

          // Получите обновленный видовой экран с новым масштабом
          const scaledViewport = page.getViewport({ scale });

          // Отрендерите страницу
          page.render({
            canvasContext: ctx,
            viewport: scaledViewport,
          });
        });
      });
    };
    try {
      fileReader.readAsArrayBuffer(file);
    } catch (e) {}
  }

  useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener("change", helper);
    }
  }, []);
}
