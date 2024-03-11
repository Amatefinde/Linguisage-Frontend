import React, { ReactNode } from "react";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogContent from '@mui/joy/DialogContent';
import {Transition} from "react-transition-group";
import PopUpUpload from "../../pages/UserMainPage/UploadBooks/PopUpUpload/PopUpUpload.tsx";

type ModalContainerProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
};

const ModalContainer: React.FC<ModalContainerProps> = ({ open, onClose, children }) => {
    return (
        <Transition in={open} timeout={300}>
            {(state: string) => (
                <Modal
                    keepMounted
                    open={!['exited', 'exiting'].includes(state)}
                    onClose={onClose}
                    slotProps={{
                        backdrop: {
                            sx: {
                                background: "rgba(0,0,0,0.55)",
                                opacity: 0,
                                backdropFilter: 'none',
                                transition: `opacity 300ms, backdrop-filter 300ms, background 300ms`,
                                ...{
                                    entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                                    entered: { opacity: 1, backdropFilter: 'blur(8px)' },
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
                            transition: `opacity 300ms, backdrop-filter 300ms`,
                            ...{
                                entering: { opacity: 1 },
                                entered: { opacity: 1 },
                            }[state],
                        }}
                    >
                        <DialogContent>{children}</DialogContent>
                    </ModalDialog>
                </Modal>
            )}
        </Transition>

    );
};

export default ModalContainer;
