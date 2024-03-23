import classes from "./OneSizeBlock.module.css"
import React from "react";
import {Card} from "@mui/joy";

interface OneSizeBlockInterface {
    children: React.ReactNode;
}

const OneSizeBlock: React.FC<OneSizeBlockInterface> = ({children}) => {
    return (
        <Card sx={{borderRadius: 20, height: 285, width: 285, padding: 2.5 }} variant={"plain"} >
            {children}
        </Card>
    );
};

export default OneSizeBlock;