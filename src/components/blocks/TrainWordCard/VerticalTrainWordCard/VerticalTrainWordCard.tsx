import React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import {IUserSense} from "../../../../types/UserSensesInterface.ts";
import Divider from "@mui/joy/Divider";


interface VerticalTrainWordCardInterface {
    sense: IUserSense;
    imageUrl?: string;
}

const VerticalTrainWordCard: React.FC<VerticalTrainWordCardInterface> = ({sense, imageUrl}) => {
    return (
        <Card
            size="lg"
            variant="plain"
            orientation="horizontal"
            sx={{

                boxShadow: 'lg',
                textAlign: 'center',
                height: 430,
                maxWidth: 900,
                minWidth: 800,
                resize: 'horizontal',
                overflow: "hidden"
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
            >
                <img style={{height: "100%"}} src={imageUrl} alt={""}/>
            </CardOverflow>
            <CardContent>
                <CardContent>
                    <Typography level="title-lg" sx={{textAlign: "start"}} textColor={"#92AFFA"}
                                fontSize={"xl3"}>Definition</Typography>
                    <Typography level="body-sm" sx={{textAlign: "start"}}
                                fontSize={"xl"}>{sense?.definition}</Typography>
                    {!!sense.examples.length && <>
                        <Divider/>
                        <Typography level="title-md" sx={{textAlign: "start"}} textColor={"#92AFFA"}
                                    fontSize={"xl3"}>Examples</Typography>
                        <Typography level="body-sm" sx={{
                            textAlign: "start", overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }} fontSize={"xl"}>

                            {sense?.examples?.slice(0,5)?.map(example =>
                                <div dangerouslySetInnerHTML={{__html: example.html_example}}></div>
                            )}
                        </Typography>
                    </>}

                </CardContent>

            </CardContent>
        </Card>
    );
};

export default VerticalTrainWordCard;