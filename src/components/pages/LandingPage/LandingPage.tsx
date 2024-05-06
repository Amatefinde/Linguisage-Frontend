import {lazy, Suspense, useState, useEffect} from 'react';
// @ts-ignore
import Fullpage, {FullpageSection, FullPageSections, FullpageNavigation} from '@ap.cx/react-fullpage';
import useAutoAuth from "../../../hooks/useAutoAuth.ts";
import LoaderForPage from "../../ui/LoaderForPage/LoaderForPage.tsx";

const HelloPage = lazy(() => import('./Slides/HelloPage/HelloPage'));
const WhatIsIt = lazy(() => import("./Slides/WhatIsIt.tsx"));
const AuthPage = lazy(() => import('./Slides/AuthPage'));

const LandingPage = () => {
    useAutoAuth()
    const sectionStyle = {
        display: "flex",
        justifyContent: "center"
    };

    const navigationStyle = {
        position: 'fixed',
        bottom: 0,
        right: 0,
        margin: '20px',
    };

    const [scrolledDown, setScrolledDown] = useState(false);



    return (
        <div id='scrollable-zone'>
        <Fullpage>
            <FullPageSections>
                <FullpageSection style={sectionStyle}>
                    <HelloPage/>
                </FullpageSection>
                <FullpageSection style={sectionStyle}>
                    <WhatIsIt scrolledDown={scrolledDown} setScrolledDown={setScrolledDown}/>
                </FullpageSection>
                <FullpageSection style={sectionStyle}>
                    {scrolledDown && (
                        <Suspense fallback={<LoaderForPage/>} >
                            <AuthPage />
                        </Suspense>
                    )}
                </FullpageSection>
            </FullPageSections>
            <FullpageNavigation style={navigationStyle}/>
        </Fullpage></div>
    );
};

export default LandingPage;
