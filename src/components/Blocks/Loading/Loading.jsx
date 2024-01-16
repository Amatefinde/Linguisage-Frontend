import React from "react";
import classes from "./Loading.module.css";
import {ThreeDots} from "react-loader-spinner";

const Loading = ({ style }) => {
  return (
    <main className={classes.loading} style={style}>
      <ThreeDots
          visible={true}
          height="100"
          width="100"
          color={style?.color ? style?.color : "#FFFFFF" }
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
      />
    </main>
  );
};

export default Loading;
