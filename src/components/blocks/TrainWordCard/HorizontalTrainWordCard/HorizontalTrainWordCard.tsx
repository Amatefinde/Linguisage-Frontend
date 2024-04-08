import React from 'react';
import {IUserSense} from "../../../../types/UserSensesInterface.ts";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Card from "@mui/joy/Card";


interface HorizontalTrainWordCardInterface {
    sense: IUserSense;
    imageUrl?: string;
}

const HorizontalTrainWordCard: React.FC<HorizontalTrainWordCardInterface> = ({sense, imageUrl}) => {
    return (
        <Card
            size="lg"
            variant="plain"
            orientation="horizontal"
            sx={{
                background: "white",
                width: 800,
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: 0,
                justifyContent: "center"
            }}
        >
            <Card
                variant={"soft"}
                sx={{
                    background: "white",
                    borderRadius: 20,
                    boxShadow: 'md',
                    textAlign: 'center',
                    width: sense.examples.length == 0 ? 600 : 308,
                    minWidth: 308,
                    resize: 'horizontal',
                    overflow: "hidden"
                }}>
                <CardOverflow
                    variant="solid"
                    color="primary"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        px: 'var(--Card-padding)',
                        padding: 0,
                    }}
                >
                    <img style={{width: "100%"}} src={imageUrl} alt={""}/>
                </CardOverflow>
                <Typography level="body-sm" sx={{textAlign: "start"}} fontSize={"xl"}>{sense?.definition}</Typography>
            </Card>
            {!!sense.examples.length && <>
                <CardContent>
                    <CardContent>

                        <Typography level="title-lg" sx={{textAlign: "start"}} textColor={"#92AFFA"}
                                    fontSize={"xl3"}>Examples</Typography>
                        <Typography level="body-sm" sx={{textAlign: "start"}} fontSize={"xl"}>
                            {sense?.examples?.slice(0, 4)?.map(example =>
                                <span key={example.id} dangerouslySetInnerHTML={{__html: example.html_example}}></span>
                            )}
                        </Typography>
                    </CardContent>
                </CardContent>
            </>}
        </Card>
    );
};

export default HorizontalTrainWordCard;