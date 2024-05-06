import classes from "./TagLine.module.css"
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
// @ts-ignore
import SplitTextJS from 'split-text-js';

const TagLine = () => {
    const container = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();
            const titles = gsap.utils.toArray("p")
            titles.forEach((title, index) => {
                const splitTitle = new SplitTextJS(title);
                tl
                    .from(splitTitle.chars, {
                        opacity: 0,
                        y: "6  dvh",
                        rotateX: -90,
                        stagger: 0.015,
                    }, "<")
                    .to(splitTitle.chars, {
                        opacity: 0,
                        y: "-6dvh",
                        rotateX: 90,
                        stagger: 0.015,
                    }, index === titles.length - 1 ? ">Infinity" : "<3");
            })
        }, container)

        return () => ctx.revert()
    }, []);

    return (
        <section className={classes.container} ref={container}>
            <div className={classes.textWrapper}>
                <p className={classes.tag}>Read book</p>
                <p className={classes.tag}>Expand Vocab</p>
                <p className={classes.tag}>Become a sage</p>
            </div>
        </section>
    );
};

export default TagLine;
