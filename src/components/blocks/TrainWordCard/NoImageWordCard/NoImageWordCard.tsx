import React from 'react';
import {IUserSense} from "../../../../types/UserSensesInterface.ts";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Card from "@mui/joy/Card";
import {AspectRatio} from "@mui/joy";
import ImageIcon from '@mui/icons-material/Image';


interface HorizontalTrainWordCardInterface {
    sense: IUserSense;
    imageUrl?: string;
}


const NoImageWordCard: React.FC<HorizontalTrainWordCardInterface> = ({sense, imageUrl}) => {
    return (
        <Card
            size="lg"
            variant="plain"
            orientation="horizontal"
            sx={{background: "white", width: 800, display: "flex", alignItems: "center", gap: 6, padding: 0}}
        >
            <Card
                variant={"soft"}
                sx={{
                    background: "white",
                    borderRadius: 20,
                    boxShadow: 'md',
                    textAlign: 'center',
                    width: 308,
                    minWidth: 308,
                    resize: 'horizontal',
                    overflow: "hidden",
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
                    <AspectRatio ratio={8/Math.min(sense.examples.length, 4)}>
                        <div>
                            <ImageIcon sx={{ fontSize: '3rem', opacity: 0.2 }} />
                        </div>
                    </AspectRatio>
                </CardOverflow>
                <Typography level="body-sm" sx={{textAlign: "start"}} fontSize={"xl"}>{sense?.definition}</Typography>
            </Card>
            <CardContent>
                <CardContent>
                    {!!sense.examples.length && <>
                        <Typography level="title-lg" sx={{textAlign: "start"}} textColor={"#92AFFA"}  fontSize={"xl3"}>Examples</Typography>
                        <Typography level="body-sm" sx={{textAlign: "start"}} fontSize={"xl"}>
                            {sense?.examples?.slice(0, 4)?.map(example =>
                                <span key={example.id} dangerouslySetInnerHTML={{__html: example.html_example}}></span>
                            )}
                        </Typography>
                    </>}
                </CardContent>
            </CardContent>
        </Card>
    );
};

export default NoImageWordCard;