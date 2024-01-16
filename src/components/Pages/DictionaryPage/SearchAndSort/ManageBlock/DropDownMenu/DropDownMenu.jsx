import {useEffect, useRef, useState} from "react";
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

function getValueByPath(obj, path) {
    // Разделить путь на части
    const pathArray = path.split('.');

    // Итеративно обращаться к полям объекта
    let value = obj;
    for (const key of pathArray) {
        if (value && value.hasOwnProperty(key)) {
            value = value[key];
        } else {
            // Вернуть undefined, если поле не существует по заданному пути
            return undefined;
        }
    }

    return value;
}

export default function DropDownMenu({label, defaultValue, options, setSortedList, list}) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentOption, setCurrentOption] = useState(defaultValue);
    const menuRef = useRef()
    useClickOutside(menuRef, () => {
        setIsOpen(false)
    })

    function sortByField() {
        const arr = [...list]
        const fieldName = currentOption.value
        if (arr.length > 0 && getValueByPath(arr[0], fieldName)) {
            arr.sort(function (a, b) {
                    // Сравниваем значения полей в зависимости от их типов
                    if (typeof getValueByPath(a, fieldName) === 'string') {
                        return getValueByPath(a, fieldName).localeCompare(getValueByPath(b, fieldName));
                    } else if (typeof getValueByPath(a, fieldName) === 'number') {
                        return getValueByPath(a, fieldName) - getValueByPath(b, fieldName);
                    } else if (getValueByPath(a, fieldName) instanceof Date && getValueByPath(b, fieldName) instanceof Date) {
                        return getValueByPath(b, fieldName) - getValueByPath(a, fieldName);
                    }
                }
            )
        }
        setSortedList(arr)
    }

    useEffect(() => {
        setSortedList(list)
        sortByField()
    }, [list, currentOption]);

    function sortPickHandler(option) {
        setCurrentOption(option);
        setIsOpen(false);
    }



    return (
        <div className={classes.wrapper}>
            <div className={classes.label}>
                {label}
            </div>
            <div className={classes.outerWrapper}>
                <div className={classes.innerWrapper} ref={menuRef}>
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
                            {currentOption.optionName}
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
                                {options.map(obj => (
                                    <motion.li
                                        key={obj.value}
                                        className={classes.li}
                                        variants={itemVariants}
                                        onClick={() => sortPickHandler(obj)}
                                    >
                                        {obj.optionName}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    </motion.nav>
                </div>
            </div>
        </div>
    );
}
