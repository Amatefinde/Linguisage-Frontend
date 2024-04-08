import React from 'react';
import Select from "@mui/joy/Select";
import Option from '@mui/joy/Option';
import classes from "./Filters.module.css"
import { ToggleButtonGroup, Tooltip} from "@mui/joy";
import Button from "@mui/joy/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';


interface IFiltersProps {
    setIsAddWordOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Filters: React.FC<IFiltersProps> = ({setIsAddWordOpen}) => {
    const sx = {
        width: 160,
        borderRadius: 25,
    }
    const [value, setValue] = React.useState<string[]>([]);
    return (
        <div className={classes.component}>
            <div className={classes.filters}>
                <Select slotProps={{
                    listbox: {
                        sx: {
                            borderRadius: '10px',
                        },
                    },
                }} variant={"soft"} sx={sx} defaultValue="new">
                    <Option value="new">New ones first</Option>
                    <Option value="old">Old ones first</Option>
                </Select>
                <ToggleButtonGroup sx={{borderRadius: 20}}
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <Button value="a1">A1</Button>
                    <Button value="a2">A2</Button>
                    <Button value="b1">B1</Button>
                    <Button value="b2">B2</Button>
                    <Button value="c1">C1</Button>
                    <Button value="c2">C2</Button>
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