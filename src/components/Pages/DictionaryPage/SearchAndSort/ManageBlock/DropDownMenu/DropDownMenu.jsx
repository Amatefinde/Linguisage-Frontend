import {useRef, useState} from "react";
import {motion, Variants} from "framer-motion";
import classes from "./DropDownMenu.module.css"
import useClickOutside from "../../../../../../hooks/useClickOutside";

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {type: "spring", stiffness: 300, damping: 24},
    },
    closed: {opacity: 0, y: 20, transition: {duration: 0.2}},
};

const sortDefineObj = {
    defaultPlaceHolder: "DropDownMenu by",

}

export default function DropDownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentOption, setCurrentOption] = useState("DropDownMenu by");
    const menuRef = useRef()

    function handleClick(name) {
        setCurrentOption(name);
        setIsOpen(false);
    }

    useClickOutside(menuRef, () => {
        console.log("Закрыли сортировку")
        setIsOpen(false)
    })

    return (
        <div className={classes.outerWrapper}>
            <div className={classes.innerWrapper}  ref={menuRef}>
                <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    className={classes.menu}
                >
                    <motion.button
                        className={classes.button}
                        whileTap={{scale: 1}}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {currentOption}
                        <motion.div
                            variants={{
                                open: {rotate: 180},
                                closed: {rotate: 0},
                            }}
                            transition={{duration: 0.2}}
                            style={{originY: 0.55}}
                        >
                            <svg width="15" height="15" viewBox="0 0 20 20">
                                <path d="M0 7 L 20 7 L 10 16"/>
                            </svg>
                        </motion.div>
                    </motion.button>
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
                            <motion.li
                                className={classes.li}
                                variants={itemVariants}
                                onClick={() => handleClick("Sort by alphabetically")}
                            >
                                alphabetically
                            </motion.li>
                            <motion.li
                                onClick={() => handleClick("Sort by date added")}
                                className={classes.li}
                                variants={itemVariants}
                            >
                                date added
                            </motion.li>
                            <motion.li
                                onClick={() => handleClick("Sort by progress")}
                                className={classes.li}
                                variants={itemVariants}
                            >
                                progress
                            </motion.li>
                        </motion.ul>
                    </div>
                </motion.nav>
            </div>
        </div>
    );
}
