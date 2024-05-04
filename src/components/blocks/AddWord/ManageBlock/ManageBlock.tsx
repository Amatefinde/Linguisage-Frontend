import React, {useState} from 'react';
import classes from "./ManageBlock.module.css"
import Button from "@mui/joy/Button";
import {Tooltip} from "@mui/joy";
import ButtonGroup from "@mui/joy/ButtonGroup";
import WordService from "../../../../http/services/WordService.ts";
import {AddErrorType, AddErrorEnum} from "../AddErrorEnum.ts";
import {IWordData} from "../../../../types/WordInterface.ts";

interface ManageBlockInterface {
    pickedFSenseId: number | null;
    pickedFImageIds: number[];
    onClose: () => void;
    addError: AddErrorType;
    setWordData: (wordData: IWordData) => void;
    setAddError: (error: AddErrorType) => void;
}

const ManageBlock: React.FC<ManageBlockInterface> = ({pickedFSenseId, pickedFImageIds, onClose, addError, setAddError, setWordData}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const queryParams = new URLSearchParams(location.search);
    const literatureId = queryParams.get("literatureId");
    function addPublicSenseToMe() {
        try {
            async function addSense() {
                setIsLoading(true)

                await WordService.addPublicSenseToMe(pickedFSenseId, pickedFImageIds, [], literatureId)

                setWordData(wordData => {
                    return {
                        ...wordData,
                        senses: wordData.senses.map(sense => {
                            if (sense.f_sense_id === pickedFSenseId) {
                                return { ...sense, in_user_dictionary: true };
                            }
                            return sense;
                        })
                    };
                });
                setAddError(AddErrorEnum.already_have)


            }
            addSense()
        } catch (e) {
            console.log(e)
        }
        setIsLoading(false)
    }

    return (
        <div className={classes.buttonWrapper}>
            <Button
                className={classes.cancelButton}
                variant="soft"
                color="neutral"
                sx={{borderRadius: 20, padding: "7px 20px 7px 20px"}}
                onClick={onClose}

            >
                Cancel
            </Button>
            <Tooltip describeChild title={addError && String(addError)}>
                <ButtonGroup
                    sx={{borderRadius: 20}}
                    color="primary"
                    orientation="horizontal"
                    size="md"
                    variant="soft"
                    disabled={!pickedFSenseId || addError}
                >
                    <Button sx={{padding: "7px 20px 7px 20px"}} loading={isLoading} onClick={addPublicSenseToMe}>Add</Button>
                    <Button>Customize and add</Button>

                </ButtonGroup>
            </Tooltip>
        </div>
    );
};

export default ManageBlock;