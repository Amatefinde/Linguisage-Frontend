import React from "react";
import {Card} from "@mui/joy";
import {OverridableStringUnion} from "@mui/types";
import {VariantProp} from "@mui/joy/styles/types";
import {CardPropsVariantOverrides} from "@mui/joy/Card/CardProps";

interface OneSizeBlockInterface {
    children: React.ReactNode;
    variant?: OverridableStringUnion<VariantProp, CardPropsVariantOverrides>;
}

const OneSizeBlock: React.FC<OneSizeBlockInterface> = ({children, variant="plain"}) => {
    return (
        <Card sx={{borderRadius: 20, height: 285, width: 285, padding: 2.5 }} variant={variant} >
            {children}
        </Card>
    );
};

export default OneSizeBlock;