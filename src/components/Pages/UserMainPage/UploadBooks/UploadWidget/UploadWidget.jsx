import React, { useRef, useState } from "react";
import classes from "./UploadWidget.module.css";
import InputField from "../../../../ui/InputField/InputField";
import AccentButton from "../../../../ui/Buttons/AccentButton/AccentButton";
import useDrawFirstPDFPage from "../../../../hooks/useDrawFirstPDFPage";

const UploadWidget = ({ setIsModalActive, setFile, canvasRef }) => {
  const hiddenFileInput = useRef(null);

  useDrawFirstPDFPage(hiddenFileInput, canvasRef, 142, 221);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  async function handleChange(event) {
    const fileUploaded = event.target.files[0];

    setIsModalActive(true);
    setFile(fileUploaded);
  }

  const [logoColor, setLogoColor] = useState("#929292");
  const [textColor, setTextColor] = useState("#929292");

  const handleMouseEnter = () => {
    setLogoColor("#7EA2FF");
    setTextColor("#4B4B4B");
  };
  const handleMouseLeave = () => {
    setLogoColor("#929292");
    setTextColor("#929292");
  };

  return (
    <section
      className={classes.UploadBooks}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={classes.Wrapper}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="93"
          height="116"
          viewBox="0 0 93 116"
          fill="none"
        >
          <path
            d="M50.6121 53.8046C50.0613 53.2773 49.4118 52.864 48.7009 52.5883C47.2908 52.0091 45.7092 52.0091 44.2992 52.5883C43.5883 52.864 42.9388 53.2773 42.3879 53.8046L30.8046 65.3879C29.714 66.4785 29.1013 67.9577 29.1013 69.5C29.1013 71.0423 29.714 72.5215 30.8046 73.6121C31.8952 74.7027 33.3744 75.3153 34.9167 75.3153C36.459 75.3153 37.9382 74.7027 39.0288 73.6121L40.7084 71.8746V86.875C40.7084 88.411 41.3186 89.8842 42.4047 90.9703C43.4909 92.0565 44.964 92.6666 46.5 92.6666C48.0361 92.6666 49.5092 92.0565 50.5954 90.9703C51.6815 89.8842 52.2917 88.411 52.2917 86.875V71.8746L53.9713 73.6121C54.5097 74.1549 55.1503 74.5858 55.856 74.8798C56.5618 75.1739 57.3188 75.3252 58.0834 75.3252C58.8479 75.3252 59.6049 75.1739 60.3107 74.8798C61.0165 74.5858 61.657 74.1549 62.1954 73.6121C62.7383 73.0737 63.1692 72.4331 63.4632 71.7273C63.7572 71.0216 63.9086 70.2646 63.9086 69.5C63.9086 68.7354 63.7572 67.9784 63.4632 67.2726C63.1692 66.5669 62.7383 65.9263 62.1954 65.3879L50.6121 53.8046ZM92.8334 40.1942C92.773 39.6621 92.6566 39.1379 92.4859 38.6304V38.1092C92.2074 37.5137 91.836 36.9663 91.3855 36.4875L56.6354 1.7375C56.1567 1.287 55.6093 0.915552 55.0138 0.637083H54.4346C53.8715 0.335934 53.2662 0.121173 52.6392 0H17.5417C12.9336 0 8.51415 1.83058 5.25571 5.08902C1.99726 8.34746 0.166687 12.7669 0.166687 17.375V98.4583C0.166687 103.066 1.99726 107.486 5.25571 110.744C8.51415 114.003 12.9336 115.833 17.5417 115.833H75.4584C80.0665 115.833 84.4859 114.003 87.7444 110.744C91.0028 107.486 92.8334 103.066 92.8334 98.4583V40.1942ZM58.0834 19.7496L73.0838 34.75H63.875C62.339 34.75 60.8659 34.1398 59.7797 33.0537C58.6936 31.9675 58.0834 30.4944 58.0834 28.9583V19.7496ZM81.25 98.4583C81.25 99.9944 80.6399 101.467 79.5537 102.554C78.4676 103.64 76.9944 104.25 75.4584 104.25H17.5417C16.0056 104.25 14.5325 103.64 13.4464 102.554C12.3602 101.467 11.75 99.9944 11.75 98.4583V17.375C11.75 15.839 12.3602 14.3658 13.4464 13.2797C14.5325 12.1935 16.0056 11.5833 17.5417 11.5833H46.5V28.9583C46.5 33.5665 48.3306 37.9859 51.5891 41.2443C54.8475 44.5028 59.2669 46.3333 63.875 46.3333H81.25V98.4583Z"
            fill={logoColor}
          />
        </svg>
        <div className={classes.Title} style={{ color: textColor }}>
          Upload books
        </div>
      </div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }}
      />
    </section>
  );
};

export default UploadWidget;
