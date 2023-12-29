import React, {useEffect, useState} from 'react';
import "./DictionarySearch.module.css"
import classes from "./DictionarySearch.module.css"

const DictionarySearch = ({setSearchedUserSenses, userSenses}) => {
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        filterSenses()
    }, [userSenses, searchQuery]);

    function filterSenses() {
        if (!searchQuery) {
            setSearchedUserSenses(userSenses)
        } else {
            setSearchedUserSenses(userSenses.filter(
                sense => (
                    sense.word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    sense.definition.toLowerCase().includes(searchQuery.toLowerCase())
                )
            ))
        }
    }

    async function changeValue(e) {
        setSearchQuery(e.target.value);
    }

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            filterSenses()
        }
    };
    return (
        <div className={classes.wrapper}>
            <div className={classes.logo}>
                <svg
                    id={classes.logo}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                >
                    <path
                        d="M9.17885 10.5477C8.03589 11.4356 6.59749 11.8545 5.15654 11.719C3.71559 11.5836 2.38043 10.904 1.42293 9.81875C0.465428 8.73345 -0.0424255 7.32402 0.0027781 5.87742C0.0479817 4.43083 0.642843 3.05585 1.66624 2.03245C2.68964 1.00905 4.06462 0.414193 5.51121 0.368989C6.95781 0.323785 8.36724 0.831639 9.45254 1.78914C10.5378 2.74665 11.2174 4.0818 11.3528 5.52275C11.4883 6.9637 11.0694 8.4021 10.1815 9.54506L13.986 13.3353L12.9762 14.3451L9.18596 10.5477H9.17885ZM5.6944 10.3202C6.25471 10.3202 6.80953 10.2098 7.32719 9.99539C7.84484 9.78097 8.3152 9.46669 8.71139 9.07049C9.10759 8.6743 9.42187 8.20394 9.63629 7.68629C9.85071 7.16863 9.96107 6.61381 9.96107 6.0535C9.96107 5.4932 9.85071 4.93838 9.63629 4.42072C9.42187 3.90306 9.10759 3.43271 8.71139 3.03651C8.3152 2.64032 7.84484 2.32604 7.32719 2.11162C6.80953 1.8972 6.25471 1.78684 5.6944 1.78684C4.56281 1.78684 3.47757 2.23636 2.67741 3.03651C1.87726 3.83667 1.42774 4.92191 1.42774 6.0535C1.42774 7.18509 1.87726 8.27034 2.67741 9.07049C3.47757 9.87065 4.56281 10.3202 5.6944 10.3202Z"
                        fill="#383838"
                    />
                </svg>
            </div>
            <input onChange={changeValue} value={searchQuery} className={classes.input} onKeyDown={handleEnterPress}/>
        </div>
    );
};

export default DictionarySearch;