import React, { useRef, useState} from "react";
import PopUpUpload from "./PopUpUpload/PopUpUpload";
import UploadWidget from "./UploadWidget/UploadWidget";
import {Transition} from 'react-transition-group';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogContent from '@mui/joy/DialogContent';
import BookLoading from "./BookLoading/BookLoading.tsx";


const UploadBooks = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null)
    const [fileLoadPercent, setFileLoadPercent] = useState<null | number>(null);
    const hiddenFileInput = useRef(null);
    
    
    return (
        <>
            <Transition in={open} timeout={400}>
                {(state: string) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={() => {
                            setOpen(false)
                            hiddenFileInput.current.value = "";
                        }}
                        slotProps={{
                            backdrop: {
                                sx: {
                                    opacity: 0,
                                    backdropFilter: 'none',
                                    transition: `opacity 200ms, backdrop-filter 400ms`,
                                    ...{
                                        entering: {
                                            opacity: 1,
                                            backdropFilter: 'blur(8px)',
                                            background: "rgba(0,0,0,0.5)"
                                        },
                                        entered: {
                                            opacity: 1,
                                            backdropFilter: 'blur(8px)',
                                            background: "rgba(0,0,0,0.5)"
                                        },
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
                                    entered: {opacity: 1, y: "0"},
                                }[state],
                            }}
                        >
                            <DialogContent>
                                <PopUpUpload
                                    file={file}
                                    fileName={fileName}
                                    setFileName={setFileName}
                                    hiddenFileInput={hiddenFileInput}
                                    setIsModalActive={setOpen}
                                    setFileLoadPercent={setFileLoadPercent}
                                />
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
            
            {fileLoadPercent ? (
                <BookLoading fileLoadPercent={fileLoadPercent}/>
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
