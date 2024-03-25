import React from 'react';
import {ThreeDots, Vortex} from "react-loader-spinner";
import classes from "./LoaderForPage.module.css"


interface LoaderForPageInterface  {
    color?: string;
}
const LoaderForPage: React.FC<LoaderForPageInterface> = ({color = "#7EA2FF"}) => {
    return (
        <section className={classes.component}>
            <p><span style={{color: color}} className={classes.loadingText}></span></p>
            <ThreeDots
                visible={true}
                height="80"
                width="120"
                color={color}
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </section>
    );
};

export default LoaderForPage;