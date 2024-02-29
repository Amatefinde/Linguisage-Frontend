import {lazy, Suspense, useState, useEffect} from 'react';
// @ts-ignore
import Fullpage, {FullpageSection, FullPageSections, FullpageNavigation} from '@ap.cx/react-fullpage';
import useAutoAuth from "../../../hooks/useAutoAuth.ts";

const HelloPage = lazy(() => import('./HelloPage/HelloPage'));
const AuthPage = lazy(() => import('./AuthPage'));

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

    const [scrolling, setScrolling] = useState(false);

    const handleScroll = () => {
        setScrolling(true);
        // Отписываемся от обработчика прокрутки после первого срабатывания
        window.removeEventListener('scroll', handleScroll);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Отписываемся от обработчика прокрутки при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Fullpage>

            <FullPageSections>
                <FullpageSection style={sectionStyle}>
                    <HelloPage/>
                </FullpageSection>
                <FullpageSection style={sectionStyle}>
                    {scrolling && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <AuthPage/>
                        </Suspense>
                    )}
                </FullpageSection>
            </FullPageSections>
            <FullpageNavigation style={navigationStyle}/>
        </Fullpage>
    );
};

export default LandingPage;
