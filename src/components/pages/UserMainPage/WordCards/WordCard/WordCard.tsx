import React from "react";
import OneSizeBlock from "../OneSizeBlock/OneSizeBlock.js"; // Assuming this component provides width constraints
import { IUserSense } from "../../../../../types/UserSensesInterface";
import Typography from "@mui/joy/Typography";
import Divider from '@mui/joy/Divider';
// Removed unused ChipSheet import
import WordSoundBlock from "../../../../blocks/WordSoundBlock/WordSoundBlock.tsx";
import { OverridableStringUnion } from "@mui/types";
import { VariantProp } from "@mui/joy/styles/types";
import { CardPropsVariantOverrides } from "@mui/joy/Card/CardProps";
import Box from '@mui/joy/Box'; // Import Box for styling the div

interface WordCardInterface {
    sense: IUserSense;
    variant?: OverridableStringUnion<VariantProp, CardPropsVariantOverrides>;
}

const WordCard: React.FC<WordCardInterface> = ({ sense, variant = "plain" }) => {

    // Define common styles for text truncation (adjust line clamp as needed)
    const ellipsisStyles = (lines: number) => ({
        display: '-webkit-box',       // Necessary for line-clamp to work
        WebkitBoxOrient: 'vertical',  // Necessary for line-clamp to work
        WebkitLineClamp: lines,       // Max number of lines to show
        overflow: 'hidden',           // Hide the overflowing text
        textOverflow: 'ellipsis',     // Add the ellipsis (...)
        // Ensure the text can wrap initially before clamping
        whiteSpace: 'normal',         // Or 'pre-wrap' if needed, but 'normal' is default
        wordBreak: 'break-word',      // Helps break long words if needed
    });

    return (
        <OneSizeBlock variant={variant}>
            <WordSoundBlock sense={sense} />
            <Typography level="h2" sx={{ mb: 1 }}> {/* Added margin-bottom */}
                {sense.word.word}
            </Typography>
            <Divider inset="none" />

            {/* Apply ellipsis to definition (e.g., max 3 lines) */}
            <Typography sx={{  mt: 1 }}> {/* Added margin-top */}
                {sense.definition}
            </Typography>

            {/* Conditional rendering for the example */}
            {sense.definition.length < 100 && !!sense.examples.length && sense.examples?.[0]?.example?.length + sense.definition.length < 147 && (
                <>
                    <Divider inset="none" sx={{ my: 1 }} /> {/* Added margin top/bottom */}
                    {/* Use Box component to apply sx styles to the container of dangerouslySetInnerHTML */}
                    {/* Apply ellipsis to example (e.g., max 2 lines) */}
                    <Box
                        sx={ellipsisStyles(2)} // Apply styles here
                        dangerouslySetInnerHTML={{ __html: sense.examples?.[0]?.html_example }}
                    />
                </>
            )}
        </OneSizeBlock>
    );
};

export default WordCard;