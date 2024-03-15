import React from 'react';
import Select from "@mui/joy/Select";
import Option from '@mui/joy/Option';
import classes from "./Filters.module.css"
import {Box, Checkbox, Chip, List, ListItem} from "@mui/joy";
import Typography from '@mui/material/Typography/Typography';
import Button from "@mui/joy/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const Filters = ({setIsAddWordOpen}) => {
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
                        borderRadius: '10px',
                    },
                },
            }} variant={"soft"} sx={sx} defaultValue="new">
                <Option value="new">New ones first</Option>
                <Option value="old">Old ones first</Option>
            </Select>
            <Box >
                <div role="group" aria-labelledby="topping">
                    <List
                        orientation="horizontal"
                        wrap
                        sx={{
                            '--List-gap': '8px',
                            '--ListItem-radius': '20px',
                        }}
                    >
                        {[
                            'A1',
                            'A2',
                            'B1',
                            'B2',
                            'C1',
                            'C2',
                        ].map((item, index) => (
                            <ListItem key={item}>
                                <Checkbox
                                    sx={{width: 30, textAlign: "center"}}
                                    defaultChecked
                                    overlay
                                    disableIcon
                                    variant="soft"
                                    label={item}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Box>
            </div>
            <div className={classes.addButtons}>
            <Button onClick={() => setIsAddWordOpen(true)} startDecorator={<AddRoundedIcon/>} sx={{borderRadius: 20}} variant={"soft"}>Add one</Button>
            <Button startDecorator={<AddRoundedIcon/>} sx={{borderRadius: 20}} variant={"soft"}>Add a few</Button>
            <Button startDecorator={<AddRoundedIcon/>} sx={{borderRadius: 20}} variant={"soft"}>Add according to description</Button>
            </div>
        </div>
    );
};

export default Filters;