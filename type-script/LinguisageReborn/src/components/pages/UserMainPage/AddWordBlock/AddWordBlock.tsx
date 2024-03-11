import React, {useState} from 'react';
import OneSizeBlock from "../OneSizeBlock/OneSizeBlock.tsx";
import classes from "./AddWordBlock.module.css"
import ModalJoyStyled from "../../../ui/ModalJoyStyled/ModalJoyStyled.tsx";
import AddWord from "../../../blocks/AddWord/AddWord.tsx";

const AddWordBlock = () => {
    const [isAddWordOpen, setIsAddWordOpen] = useState<boolean>(false)

    return (
        <>
            <ModalJoyStyled open={isAddWordOpen} onClose={() => setIsAddWordOpen(false)}>
                <AddWord onClose={() => setIsAddWordOpen(false)}/>
            </ModalJoyStyled>
        <OneSizeBlock>
        <div onClick={() => {setIsAddWordOpen(true)}} className={classes.addWordBlock}>
            <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M48 99.84C48 101.961 49.7192 103.68 51.84 103.68C53.9608 103.68 55.68 101.961 55.68 99.84V55.68H99.84C101.961 55.68 103.68 53.9607 103.68 51.84C103.68 49.7192 101.961 48 99.84 48H55.68V3.83997C55.68 1.71919 53.9608 -3.05176e-05 51.84 -3.05176e-05C49.7192 -3.05176e-05 48 1.71919 48 3.83997V48H3.84C1.71923 48 0 49.7192 0 51.84C0 53.9607 1.71923 55.68 3.84 55.68H48V99.84Z"
                      fill="#DEDEDE"/>
            </svg>
        </div>

        </OneSizeBlock>
        </>
    );
};

export default AddWordBlock;