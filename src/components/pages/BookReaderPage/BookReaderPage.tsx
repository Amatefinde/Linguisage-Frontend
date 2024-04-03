import React, {useEffect, useState} from 'react';
import {ReactReader} from "react-reader";
import Header from "../../blocks/Header/Header.tsx";
import type {Contents, Rendition} from 'epubjs'

const BookReaderPage: React.FC = () => {
    const [bookLocation, setBookLocation] = useState<string | number>(0)
    const queryParams = new URLSearchParams(location.search);
    const bookUrl = queryParams.get("bookUrl");
    type ITextSelection = {
        text: string
        context: string
    }
    const [selections, setSelections] = useState<ITextSelection>([])
    const [rendition, setRendition] = useState<Rendition | undefined>(undefined)
    useEffect(() => {
        if (rendition) {
            function setRenderSelection(cfiRange: string, contents: Contents) {
                if (rendition) {
                    setSelections({
                        "text": rendition.getRange(cfiRange).toString(),
                        "context": contents.content?.innerText
                    })
                }
            }

            rendition.on('selected', setRenderSelection)
            return () => {
                rendition?.off('selected', setRenderSelection)
            }
        }
    }, [setSelections, rendition])

    return (
        <>
            <Header/>
            <div style={{height: 'calc(100vh - 80px)'}}>
                <ReactReader
                    url={bookUrl}
                    location={bookLocation}
                    locationChanged={(epubcfi: string) => setBookLocation(epubcfi)}
                    getRendition={(_rendition: Rendition) => {
                        setRendition(_rendition)
                    }}
                />
            </div>
        </>
    )
};

export default BookReaderPage;