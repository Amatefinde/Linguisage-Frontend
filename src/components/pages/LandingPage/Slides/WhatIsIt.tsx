import React, {useEffect} from 'react';
import {AspectRatio, Box, Button, Chip, Container, Typography} from '@mui/joy';
import ArrowForward from "@mui/icons-material/ArrowForward";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {typographyClasses} from '@mui/joy/Typography';
import linguisageImage from "./../../../../static/images/img.png"

interface IWhatIsItProps {
    scrolledDown: boolean,
    setScrolledDown: React.Dispatch<React.SetStateAction<boolean>>,
}

const WhatIsIt: React.FC<IWhatIsItProps> = ({scrolledDown, setScrolledDown}) => {
    const reversed = false
    const containerWidth = 1200

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight && !scrolledDown) {
            setScrolledDown(true);
            // Отписываемся от обработчика прокрутки после прокрутки вниз
            window.removeEventListener('scroll', handleScroll);
        }
    };

    const handleGetStarted = () => {
        let targetElement = document.getElementById('scrollable-zone');
        targetElement.scrollTop -= 1000
    }


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Отписываемся от обработчика прокрутки при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Container
            sx={(theme) => ({
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: reversed ? 'column-reverse' : 'column',
                alignItems: 'center',
                py: 10,
                gap: 4,
                [theme.breakpoints.up(containerWidth)]: {
                    flexDirection: 'row',
                    gap: 6,
                },
                [theme.breakpoints.up(1199)]: {
                    gap: 12,
                },
            })}
        >
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    maxWidth: '50ch',
                    textAlign: 'center',
                    flexShrink: 999,
                    [theme.breakpoints.up(containerWidth)]: {
                        minWidth: 600,
                        alignItems: 'flex-start',
                        textAlign: 'initial',
                    },
                    [`& .${typographyClasses.root}`]: {
                        textWrap: 'balance',
                    },
                })}
            >

                <Typography
                    level="body-xs"
                    fontWeight={500}
                    fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
                >
                    <Typography level="body-xs" fontWeight={600} fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)">
                        Linguisage
                    </Typography>
                    {" is a convenient tool for expanding your vocabulary"}
                </Typography>
                <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
                    Just upload your favorite literature, select unfamiliar words, and then go through AI powered tasks
                    to study these words.
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        my: 2,
                        flexWrap: "wrap",
                        "& > *": {flex: "auto"},
                    }}
                >
                    <Button size="lg" endDecorator={<ArrowForward fontSize="xl"/>} onClick={handleGetStarted}>
                        Get Started
                    </Button>
                    <Button
                        size="lg"
                        variant="outlined"
                        color="neutral"
                        startDecorator={<PlayCircleOutlineIcon/>}
                    >
                        Watch Video
                    </Button>
                </Box>
            </Box>
            <AspectRatio
                ratio={700 / 400}
                variant="outlined"
                maxHeight={300}
                sx={(theme) => ({
                    minWidth: 530  ,
                    alignSelf: 'stretch',
                    [theme.breakpoints.up(containerWidth)]: {
                        alignSelf: 'initial',
                        flexGrow: 1,
                        '--AspectRatio-maxHeight': '520px',
                        '--AspectRatio-minHeight': '400px',
                    },
                    borderRadius: 'sm',
                    bgcolor: 'background.level2',
                    flexBasis: '50%',
                })}
            >
                <img
                    src={linguisageImage}
                    alt=""
                />
            </AspectRatio>
        </Container>

    );
};

export default WhatIsIt;