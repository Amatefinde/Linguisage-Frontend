import classes from "./HelloPage.module.css";
import React from "react";

const HelloPage: React.FC = () => {
    return (
        <section className={classes.wrapper}>
            <svg
                width="12dvw"
                height="12dvw"
                viewBox="0 0 215 215"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="214.711" height="214.711" rx="107.356" fill="#5280DB" />
            </svg>
            <h1 className={classes.text}>Linguisage</h1>
        </section>
    );
};
export default HelloPage;
