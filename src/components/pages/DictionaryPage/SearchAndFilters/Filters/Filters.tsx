import React from 'react';
import Select from "@mui/joy/Select";
import Option from '@mui/joy/Option';
import classes from "./Filters.module.css"
import { ToggleButtonGroup, Tooltip} from "@mui/joy";
import Button from "@mui/joy/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {IWordStatus} from "../../../../../types/IWordStatus.ts";


interface IFiltersProps {
    setIsAddWordOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setWordStatusFilter:  React.Dispatch<React.SetStateAction<IWordStatus[]>>;
    wordStatusFilter: IWordStatus[];
}

const Filters: React.FC<IFiltersProps> = ({setIsAddWordOpen, setWordStatusFilter, wordStatusFilter}) => {
    const sx = {
        width: 160,
        borderRadius: 25,
    }

    return (
        <div className={classes.component}>
            <div className={classes.filters}>
                <Select slotProps={{
                    listbox: {
                        sx: {
                            borderRadius: '15px',
                        },
                    },
                }} variant={"outlined"} sx={sx} defaultValue="new">
                    <Option value="new">New ones first</Option>
                    <Option value="old">Old ones first</Option>
                </Select>
                {/*<ToggleButtonGroup sx={{borderRadius: 20}}*/}
                {/*    value={value}*/}
                {/*    onChange={(event, newValue) => {*/}
                {/*        setValue(newValue);*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Button value="a1">A1</Button>*/}
                {/*    <Button value="a2">A2</Button>*/}
                {/*    <Button value="b1">B1</Button>*/}
                {/*    <Button value="b2">B2</Button>*/}
                {/*    <Button value="c1">C1</Button>*/}
                {/*    <Button value="c2">C2</Button>*/}
                {/*</ToggleButtonGroup>*/}
                <ToggleButtonGroup sx={{borderRadius: 20}}
                                   value={wordStatusFilter}
                                   onChange={(_, newValue) => {
                                       setWordStatusFilter(newValue);
                                   }}
                >
                    <Button value="in_queue">Upcoming</Button>
                    <Button value="in_process">Current</Button>
                    <Button value="complete">Completed</Button>
                </ToggleButtonGroup>
            </div>
            <div className={classes.addButtons}>
                <Button onClick={() => setIsAddWordOpen(true)} startDecorator={<AddRoundedIcon/>}
                        sx={{borderRadius: 20}} variant={"soft"}>Add one</Button>
                <Tooltip disableTouchListener title="Soon!" variant="plain">
                    <span>
                    <Button disabled startDecorator={<AddRoundedIcon/>} sx={{borderRadius: 20}}
                            variant={"soft"}>Add a few</Button></span>
                </Tooltip>
                <Tooltip title="Soon!" variant="plain">
                    <span>
                    <Button disabled startDecorator={<AddRoundedIcon/>} sx={{borderRadius: 20}} variant={"soft"}>Add
                        according to description</Button>
</span>
                </Tooltip>

            </div>
        </div>
    );
};

export default Filters;