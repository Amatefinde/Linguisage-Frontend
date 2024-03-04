import React from 'react';
import classes from "./BookLoading.module.css"
import {LinearProgress} from "@mui/joy";

interface BookLoadingInterface {
    fileLoadPercent: number;
}

const BookLoading: React.FC<BookLoadingInterface> = ({fileLoadPercent}) => {
    return (
        <section className={classes.bookLoading}>
            <div className={classes.text}>Loading {fileLoadPercent}%</div>
            <div style={{width: "400px"}}>
                <LinearProgress sx={{color: "#7EA2FF"}} color={"primary"} value={fileLoadPercent} thickness={24} variant={"soft"} determinate/>
            </div>
        </section>
    );
};

export default BookLoading;