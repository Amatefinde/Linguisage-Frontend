import React, {useEffect, useState} from "react";
import classes from "./PopUpUpload.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import {Checkbox, FormLabel} from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import ButtonGroup from "@mui/joy/ButtonGroup";


const PopUpUpload = ({file, fileName, setFileName, hiddenFileInput, setIsModalActive}) => {
    
    useEffect(() => { // при демониторивании копмпонента сбрасываем текущую выбранные лит-ру
        return () => hiddenFileInput.current.value = null
    }, []);
    
    return (
        <div className={classes.wrapper}>
            <div className={classes.bookCover}>
            </div>
            <div className={classes.forms}>
                <section className={classes.management}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input value={file?.text && fileName} onChange={e => setFileName(e)}/>
                    
                    </FormControl>
                    <FormControl>
                        <Checkbox label="Automatic text recognition" disabled/>
                        <FormHelperText>Only for PDF</FormHelperText>
                    </FormControl>
                
                </section>
                <ButtonGroup spacing={2}>
                    <Button variant={"outlined"} color="neutral" onClick={() => setIsModalActive(false)}>Cancel</Button>
                    <Button variant={"solid"} color="primary">Upload</Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default PopUpUpload;
