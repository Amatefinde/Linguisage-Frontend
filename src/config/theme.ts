import {extendTheme} from "@mui/joy/styles";

type variantType = "plain" | "outlined" | "soft" | "solid"

const globalVariant: variantType = "outlined"

const theme = extendTheme({
    fontFamily: {
        display: 'Gilroy bold, sans-serif', // applies to `h1`–`h4`
        body: 'Gilroy bold, sans-serif', // applies to `title-*` and `body-*`
    },
    components: {
        JoyButton: {
            defaultProps: {
                variant: globalVariant, // Здесь укажите желаемый вариант
            },
        },
        JoySheet: {
            defaultProps: {
                variant: globalVariant, // Здесь укажите желаемый вариант
            },
        },
        JoyInput: {
            defaultProps: {
                variant: globalVariant, // Здесь укажите желаемый вариант

            },
        },
        JoyButtonGroup: {
            defaultProps: {
                variant: globalVariant, // Здесь укажите желаемый вариант
            },
        },
    },
});

export default theme;