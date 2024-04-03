import React, {useEffect, useState} from 'react';
import Header from "../../blocks/Header/Header.tsx";
import type {Contents, Rendition} from 'epubjs'
import { ReactReader, ReactReaderStyle, IReactReaderStyle, EpubViewStyle, IEpubViewStyle } from 'react-reader';
import AddWord from "../../blocks/AddWord/AddWord.tsx";
import ModalJoyStyled from "../../ui/ModalJoyStyled/ModalJoyStyled.tsx";


const BookReaderPage: React.FC = () => {
    const [bookLocation, setBookLocation] = useState<string | number>(0)
    const queryParams = new URLSearchParams(location.search);
    const bookUrl = queryParams.get("bookUrl");

    const [isAddWordOpen, setIsAddWordOpen] = useState<boolean>(false)
    const [selections, setSelections] = useState<string>("")
    const [rendition, setRendition] = useState<Rendition | undefined>(undefined)

    useEffect(() => {
        if (selections) {
            setIsAddWordOpen(true)
        }
    }, [selections]);

    useEffect(() => {
        if (rendition) {
            function setRenderSelection(cfiRange: string, contents: Contents) {
                if (rendition) {
                    // setSelections({
                    //     "text": rendition.getRange(cfiRange).toString(),
                    //     "context": contents.content?.innerText
                    // })
                    setSelections(rendition.getRange(cfiRange).toString())
                }
            }

            rendition.on('selected', setRenderSelection)
            return () => {
                rendition?.off('selected', setRenderSelection)
            }
        }
    }, [setSelections, rendition])


    const readerStyles:IReactReaderStyle = {
        ...ReactReaderStyle,
        container: {
            ...ReactReaderStyle.container,
            color: 'red'
        }
    }
    const epubViewStyles:IEpubViewStyle = {
        ...EpubViewStyle,
        view: {
            ...EpubViewStyle.view,
            width: "70%",
            margin: "0 auto",
        }

    }

    function onClose() {
        setIsAddWordOpen(false)
        setSelections("")
    }

    return (
        <>
            <Header/>
            <ModalJoyStyled open={isAddWordOpen} onClose={onClose}>
                <AddWord onClose={onClose} selections={selections} setSelections={setSelections}/>
            </ModalJoyStyled>
            <div style={{height: 'calc(100vh - 80px)' }}>
                <ReactReader
                    epubOptions={{spread: 'none', }}
                    url={bookUrl}
                    location={bookLocation}
                    locationChanged={(epubcfi: string) => setBookLocation(epubcfi)}
                    getRendition={(_rendition: Rendition) => {
                        _rendition.themes.fontSize("140%")
                        setRendition(_rendition)
                    }}
                    epubViewStyles={epubViewStyles}
                />
            </div>
        </>
    )
};

export default BookReaderPage;