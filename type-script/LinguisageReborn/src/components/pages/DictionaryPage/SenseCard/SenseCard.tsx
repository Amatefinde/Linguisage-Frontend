import React from 'react';
import {IUserSense} from "../../../../types/UserSensesInterface.ts";
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Typography from "@mui/joy/Typography";
import {Check, KeyboardArrowRight} from "@mui/icons-material";
import {Card, CardActions, List, ListItemDecorator} from "@mui/joy";
import ListItem from '@mui/joy/ListItem';
import Button from '@mui/joy/Button';

interface SenseCardInterface {
    sense: IUserSense;
}

const SenseCard: React.FC<SenseCardInterface> = ({sense}) => {
    return (
        <div>
        <Card size="lg" variant="outlined">
            <Chip size="sm" variant="outlined" color="neutral">
                {sense.lvl!="null" && sense.lvl}
            </Chip>
            <Typography level="h2">{sense.word.word}</Typography>
            <Divider inset="none" />
            <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                <ListItem>
                    <ListItemDecorator>
                        <Check />
                    </ListItemDecorator>
                    Virtual Credit Cards
                </ListItem>
                <ListItem>
                    <ListItemDecorator>
                        <Check />
                    </ListItemDecorator>
                    Financial Analytics
                </ListItem>
                <ListItem>
                    <ListItemDecorator>
                        <Check />
                    </ListItemDecorator>
                    Checking Account
                </ListItem>
                <ListItem>
                    <ListItemDecorator>
                        <Check />
                    </ListItemDecorator>
                    API Integration
                </ListItem>
            </List>
            <Divider inset="none" />
            <CardActions>
                <Typography level="title-lg" sx={{ mr: 'auto' }}>
                    3.990€{' '}
                    <Typography fontSize="sm" textColor="text.tertiary">
                        / month
                    </Typography>
                </Typography>
                <Button
                    variant="soft"
                    color="neutral"
                    endDecorator={<KeyboardArrowRight />}
                >
                    Start now
                </Button>
            </CardActions>
        </Card>
        </div>
    );
};

export default SenseCard;