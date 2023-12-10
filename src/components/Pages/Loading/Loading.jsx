import React from "react";
import classes from "./Loading.module.css";

const Loading = ({ style }) => {
  return (
    <main className={classes.loading} style={style}>
      Loading...
    </main>
  );
};

export default Loading;
