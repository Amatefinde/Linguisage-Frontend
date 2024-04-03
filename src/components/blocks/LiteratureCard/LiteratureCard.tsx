import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import IBook from "../../../types/IBook.ts";
import {LinearProgress} from "@mui/joy";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import LiteratureCardDropdown from "./LiteratureCardDropdown.tsx";


interface ILiteratureCardProps {
    book: IBook;
    setBooks: React.Dispatch<React.SetStateAction<IBook[] | undefined>>
}

function formatDateRange(startDate: string | Date, endDate: string | Date): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };

    let formattedDate = start.toLocaleDateString('en-US', options);

    if (end) {
        const formattedEndDate = end.toLocaleDateString('en-US', options);
        formattedDate = `${formattedDate} to ${formattedEndDate}`;
    }

    return formattedDate;
}

const LiteratureCard: React.FC<ILiteratureCardProps> = ({book, setBooks}) => {

    const slicedTitle = book.title.length > 35 ? book.title.slice(0, 35) + "..." : book.title

    return (
        <Card sx={{width: 220}} variant={"soft"}>
            <div style={{height: 60}}>
                <Typography sx={{marginRight: 3, overflow: "hidden"}} level="title-lg">{slicedTitle}</Typography>
                <Typography level="body-sm">{formatDateRange(book.created_at, book.last_opened_at)}</Typography>
                <LiteratureCardDropdown setBooks={setBooks} book={book}/>
            </div>
            <AspectRatio minHeight="240px" maxHeight="400px">
                <img
                    src={book.cover}
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <CardContent orientation="horizontal">
                <div style={{width: "300px"}}>
                    <Typography level="body-sm">Total readed:</Typography>
                    <LinearProgress determinate value={25} variant={"solid"}/>
                </div>
                <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ml: 'auto', alignSelf: 'center', fontWeight: 600}}
                >
                    Read
                </Button>
            </CardContent>
        </Card>
    );
};

export default LiteratureCard;