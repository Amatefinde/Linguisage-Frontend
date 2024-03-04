import React from 'react';
import classes from "./AddWord.module.css"
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";
import SearchIcon from '@mui/icons-material/Search';
import {Card, Tab, tabClasses, TabList, Tabs} from "@mui/joy";
import Typography from "@mui/joy/Typography";

const AddWord = () => {
    return (
        <div>
            <Sheet className={classes.container} sx={{padding: "50px", border: "none"}}>
                <Sheet sx={{width: 300, border: "none", gap: 2, display: "flex", flexDirection: "column"}}>
                    <Input
                        variant={"soft"}
                        color={"primary"}
                        sx={{'--Input-radius': `20px`,}}
                        startDecorator={<SearchIcon />}
                    />
                    <Card variant="soft" sx={{'--Card-radius': `20px`,}} >
                        <Typography level="title-lg">Yosemite National Park</Typography>
                        <Typography level="body-sm">April 24 to May 02, 2021</Typography>
                        <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }}>
                            <TabList
                                disableUnderline
                                sx={{
                                    p: 0.5,
                                    gap: 0.5,
                                    borderRadius: 'xl',
                                    bgcolor: 'background.level1',
                                    [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                        boxShadow: 'sm',
                                        bgcolor: 'background.surface',
                                    },
                                }}
                            >
                                <Tab disableIndicator>Definition</Tab>
                                <Tab disableIndicator>Examples</Tab>
                            </TabList>
                        </Tabs>
                    </Card>
                </Sheet>
            </Sheet>
        </div>
    );
};

export default AddWord;