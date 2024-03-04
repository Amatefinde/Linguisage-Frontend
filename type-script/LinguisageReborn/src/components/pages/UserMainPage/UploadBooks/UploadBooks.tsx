import React, {useEffect, useRef, useState} from "react";
import classes from "./UploadBooks.module.css";
import PopUpUpload from "./PopUpUpload/PopUpUpload";
import Loading from "../../../blocks/Loading/Loading.js";
import UploadWidget from "./UploadWidget/UploadWidget";
import {Transition} from 'react-transition-group';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import {current} from "@reduxjs/toolkit";


const UploadBooks = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null)
    const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
    const hiddenFileInput = useRef(null);
    
    async function uploadFile() {
        // try {
        //     setIsModalActive(false);
        //     setIsFileLoading(true);
        //     await BookService.add_book(file);
        // } catch (e) {
        //     console.log("Ошибка при загрузке файла: ", e);
        // } finally {
        //     setIsFileLoading(false);
        // }
    }
    
    return (
        <>
            <Transition in={open} timeout={400}>
                {(state: string) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={() => {
                            setOpen(false)
                        }}
                        slotProps={{
                            backdrop: {
                                sx: {
                                    opacity: 0,
                                    backdropFilter: 'none',
                                    transition: `opacity 200ms, backdrop-filter 400ms`,
                                    ...{
                                        entering: {opacity: 1, backdropFilter: 'blur(8px)', background: "rgba(0,0,0,0.5)"},
                                        entered: {opacity: 1, backdropFilter: 'blur(8px)', background: "rgba(0,0,0,0.5)"},
                                    }[state],
                                },
                            },
                        }}
                        sx={{
                            visibility: state === 'exited' ? 'hidden' : 'visible',
                            
                        }}
                    >
                        <ModalDialog
                            sx={{
                                opacity: 0,
                                borderRadius: "20px",
                                transition: `opacity 200ms`,
                                ...{
                                    entering: {opacity: 1, y: "100"},
                                    entered: {opacity: 1,  y: "0"},
                                }[state],
                            }}
                        >
                            <DialogContent>
                                    <PopUpUpload
                                        file={file}
                                        fileName={fileName}
                                        setFileName={setFileName}
                                        callback={uploadFile}
                                        hiddenFileInput={hiddenFileInput}
                                        setIsModalActive={setOpen}
                                    />
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
            {/*<Modal showModal={isModalActive} setShowModal={setIsModalActive}>*/}

            {/*</Modal>*/}
            {isFileLoading ? (
                <Loading/>
            ) : (
                <UploadWidget
                    setIsModalActive={setOpen}
                    setFile={setFile}
                    setFileName={setFileName}
                    hiddenFileInput={hiddenFileInput}
                />
            )}
        </>
    );
};

export default UploadBooks;
