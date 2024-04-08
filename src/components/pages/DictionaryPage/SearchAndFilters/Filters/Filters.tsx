import React from 'react';
import Select from "@mui/joy/Select";
import Option from '@mui/joy/Option';
import classes from "./Filters.module.css"
import {Box, Checkbox, List, ListItem, Tooltip} from "@mui/joy";
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
                <Box>
                        <List
                            orientation="horizontal"
                            wrap
                            sx={{
                                '--List-gap': '8px',
                                '--ListItem-radius': '20px',
                            }}
                        >
                            {[
                                'Upcoming',
                                'Learning',
                                'Learned',
                            ].map((item) => (
                                <ListItem key={item}>
                                    <Checkbox
                                        sx={{ textAlign: "center"}}
                                        defaultChecked
                                        overlay
                                        disableIcon
                                        variant={value.includes(item) ? 'soft' : 'outlined'}
                                        label={item}
                                        slotProps={{
                                            action: ({ checked }) => ({
                                                sx: checked
                                                    ? {
                                                        border: '1px solid',
                                                        borderColor: 'primary.500',
                                                    }
                                                    : {},
                                            }),
                                        }}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            if (event.target.checked) {
                                                setValue((val) => [...val, item]);
                                            } else {
                                                setValue((val) => val.filter((text) => text !== item));
                                            }
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                </Box>
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