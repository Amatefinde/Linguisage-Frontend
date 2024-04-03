import React, {useEffect, useState} from 'react';
import Header from "../../blocks/Header/Header.tsx";
import LiteratureCard from "../../blocks/LiteratureCard/LiteratureCard.tsx";
import BookService from "../../../http/services/BookService.ts";
import IBook from "../../../types/IBook.ts";
import classes from "./LiteraturePage.module.css"
import {Stack} from "@mui/joy";
import LoaderForPage from "../../ui/LoaderForPage/LoaderForPage.tsx";
import NoLiterature from "./NoLiterature/NoLiterature.tsx";

const LiteraturePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [books, setBooks] = useState<IBook[]>()
    const [isNoLiterature, setIsNoLiterature] = useState<boolean>(false)

    useEffect(() => {
        if (books?.length === 0) {
            setIsNoLiterature(true)
        }
    }, [books]);


    useEffect(() => {
        async function fetchLiterature() {
            setIsLoading(true)
            try {
                const fetchedBooks = await BookService.getBooks()
                setBooks(fetchedBooks.books)

            } catch (e) {
                console.log("Произошла ошибка при загрузке литературы", e)
            }
            setIsLoading(false)
        }

        fetchLiterature()
    }, []);


    const component = (
        <div className={"smoothAppear"}>
            <div className={classes.container}>
                <Stack spacing={2} direction="row" flexWrap="wrap" useFlexGap>
                    {books && books.map(book => <LiteratureCard setBooks={setBooks} key={book.id} book={book}/>)}
                </Stack>
            </div>
        </div>
    )

    return (
        <>
            <Header/>
            {
                isNoLiterature ? <NoLiterature/> :
                isLoading ? <LoaderForPage/> : component
            }
        </>
    );
};

export default LiteraturePage;