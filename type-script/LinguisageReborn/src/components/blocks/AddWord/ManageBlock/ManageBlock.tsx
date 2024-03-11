import React from 'react';
import classes from "./ManageBlock.module.css"
import Button from "@mui/joy/Button";
import {Tooltip} from "@mui/joy";
import ButtonGroup from "@mui/joy/ButtonGroup";

interface ManageBlockInterface {
    pickedFSenseId: number | null;
    pickedFImageIds: number[];
}

const ManageBlock: React.FC<ManageBlockInterface> = ({pickedFSenseId, pickedFImageIds}) => {
    return (
        <div className={classes.buttonWrapper}>
            <Button
                className={classes.cancelButton}
                variant="soft"
                color="neutral"
                sx={{borderRadius: 20, padding: "7px 20px 7px 20px"}}

            >
                Cancel
            </Button>
            <Tooltip describeChild title="Does not add if it already exists.">
                <ButtonGroup
                    sx={{borderRadius: 20}}
                    color="primary"
                    orientation="horizontal"
                    size="md"
                    variant="soft"
                    disabled={!pickedFSenseId}
                >
                    <Button sx={{padding: "7px 20px 7px 20px"}}>Add</Button>
                    <Button>Customize and add</Button>

                </ButtonGroup>
            </Tooltip>
        </div>
    );
};

export default ManageBlock;