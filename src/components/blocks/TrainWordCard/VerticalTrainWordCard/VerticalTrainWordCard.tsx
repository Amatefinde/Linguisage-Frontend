import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import {IUserSense} from "../../../../types/UserSensesInterface.ts";


interface VerticalTrainWordCardInterface {
    sense: IUserSense;
}

const VerticalTrainWordCard: React.FC<VerticalTrainWordCardInterface> = ({sense}) => {

    return (
        <Card
            size="lg"
            variant="plain"
            orientation="horizontal"
            sx={{
                textAlign: 'center',
                height: 430,
                width: 690,
                // to make the demo resizable
                resize: 'horizontal',
                overflow: 'auto',
            }}
        >
            <CardOverflow
                variant="solid"
                color="primary"
                sx={{
                    flex: '0 0 200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: 'var(--Card-padding)',
                    padding: 0,
                }}
                // src={sense.word_images.pop()}
            >
                <img style={{height: "100%"}} src={"https://linguisage.ru:9100/static/word_images/nurture_6.jpg"} alt={""}/>
                {/*<Typography fontSize="xl4" fontWeight="xl" textColor="#fff">*/}
                {/*    89*/}
                {/*</Typography>*/}
                {/*<Typography textColor="primary.200">*/}
                {/*    FAQs answered, see if yours is one of them.*/}
                {/*</Typography>*/}
            </CardOverflow>
            <CardContent sx={{ gap: 1.5, minWidth: 200 }}>

                <CardContent>
                    <Typography level="title-lg" fontSize={"xl2"}>{sense?.definition}</Typography>
                    <Typography fontSize="sm" sx={{ mt: 0.5 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor.
                    </Typography>
                </CardContent>
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                        '--variant-borderWidth': '2px',
                        borderRadius: 40,
                        borderColor: 'primary.500',
                        mx: 'auto',
                    }}
                >
                    See FAQ
                </Button>
            </CardContent>
        </Card>
    );
};

export default VerticalTrainWordCard;