import React, {useRef, useState} from 'react';
import classes from "./KebabMenu.module.css"
import kebabMenuIcon from "../../../icons/kebab.svg";
import {motion} from "framer-motion";
import useClickOutside from "../../../../hooks/useClickOutside";

const KebabMenu = ({config}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef()

    useClickOutside(menuRef, () => {
        setIsOpen(false)
    })
    return (
        <div>
            <motion.nav
                initial={false}
                animate={isOpen ? "open" : "closed"}
                className={classes.menu}
            >
                <motion.img
                    src={kebabMenuIcon}
                    className={classes.button}
                    whileTap={{scale: 1}}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <motion.div
                        variants={{
                            open: {rotate: 180, translateY: -3},
                            closed: {rotate: 0},
                        }}
                        transition={{duration: 0.2}}
                        style={{originY: 0.55}}
                    >
                        <svg width="15" height="15" viewBox="0 0 20 20">
                            <path d="M0 7 L 20 7 L 10 16"/>
                        </svg>
                    </motion.div>
                </motion.img>
                <div className={[classes.ulWrapper, isOpen ? "" : classes.disabled].join(" ")}>
                    <motion.ul
                        className={classes.ul}
                        variants={{
                            open: {
                                clipPath: "inset(0% 0% 0% 0% round 10px)",
                                transition: {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.2,
                                    delayChildren: 0,
                                    staggerChildren: 0.05,
                                },
                            },
                            closed: {
                                clipPath: "inset(10% 50% 90% 50% round 10px)",
                                transition: {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.3,
                                },
                            },
                        }}
                        style={{pointerEvents: isOpen ? "auto" : "none"}}
                    >
                        {options.map(obj => (
                            <motion.li
                                key={obj.value}
                                className={classes.li}
                                variants={itemVariants}
                                // onClick={() => }
                            >
                                {obj.optionName}
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </motion.nav>
        </div>
    );
};

export default KebabMenu;