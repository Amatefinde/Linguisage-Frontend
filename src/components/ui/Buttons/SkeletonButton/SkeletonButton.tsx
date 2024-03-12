import React, { ReactNode, CSSProperties } from "react";
import classes from "./SkeletonButton.module.css";

interface SkeletonButtonProps {
  children: ReactNode;
  style?: CSSProperties;
}

const SkeletonButton: React.FC<SkeletonButtonProps> = ({ children, style }) => {
  return (
      <button style={style} className={classes.Button}>
        {children}
      </button>
  );
};

export default SkeletonButton;
