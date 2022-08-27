import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
    const [dates, setDates] = useState([ //State for calendar library
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [openDate, setOpenDate] = useState(false); //To open calendar on click
    const [openOptions, setOpenOptions] = useState(false); //To open options on click
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });
    const [destination, setDestination] = useState("");

    const handleOption = (name, operation) => {
        setOptions((prev) => { //Take previous value from the state (adult: 1)
            return {
                ...prev,
                [name]: operation === "increase"
                    //If I write it inside array it will find name inside state object
                    ? options[name] + 1 //Exmaple is options[adult]
                    : options[name] - 1
            }
        });
    };

    //To get data from state that we will use in List.jsx page
    const { dispatch } = useContext(SearchContext);

    const navigate = useNavigate();

    const handleSearch = () => { //Passing state to the List.jsx with onClick
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } }); //Context
        navigate("/hotels", {
            state: {
                destination,
                dates,
                options
            }
        });
    };

    const { user } = useContext(AuthContext);

    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <Link to="/" className="link">
                        <div className="headerListItem active">
                            <FontAwesomeIcon icon={faBed} />
                            <span>Stays</span>
                        </div>
                    </Link>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
                {type !== "list" &&
                    <>
                        <h1 className="headerTitle">
                            A lifetime of discounts? It's Genious!
                        </h1>
                        <p className="headerDesc">
                            Get rewarded for your travels – unlock instant
                            savings of 10% or more with a free Booker account
                        </p>
                        {user ? ("Hello, " + user.username + "!") : (
                            <Link to="/login">
                                <button className="headerButton">Sign in / Register</button>
                            </Link>
                        )}
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input
                                    type="text"
                                    placeholder="Berlin, Madrid or London!"
                                    className="headerSearchInput"
                                    onChange={(e) => setDestination(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                                />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
                                    {`${format(
                                        dates[0].startDate,
                                        "MM/dd/yyyy" //Giving format type I want to see on my page
                                    )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                                </span>
                                {openDate && (<DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className="date"
                                    minDate={new Date()} //So you can't select dates in past
                                />)}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span className="headerSearchText" onClick={() => setOpenOptions(!openOptions)}>
                                    {`${options.adult} adult • ${options.children} children • ${options.room} room`}
                                </span>
                                {openOptions && (
                                    <div className="options">
                                        <>
                                            <div className="optionItem">
                                                <span className="optionText">Adult</span>
                                                <div className="optionCounter">
                                                    <button
                                                        className="optionCounterButton"
                                                        onClick={() => handleOption("adult", "decrease")}
                                                        disabled={options.adult <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="optionCounterNumber">
                                                        {options.adult}
                                                    </span>
                                                    <button
                                                        className="optionCounterButton"
                                                        onClick={() => handleOption("adult", "increase")}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="optionItem">
                                                <span className="optionText">Children</span>
                                                <div className="optionCounter">
                                                    <button
                                                        className="optionCounterButton"
                                                        onClick={() => handleOption("children", "decrease")}
                                                        disabled={options.children <= 0}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="optionCounterNumber">
                                                        {options.children}
                                                    </span>
                                                    <button
                                                        className="optionCounterButton"
                                                        onClick={() => handleOption("children", "increase")}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="optionItem">
                                                <span className="optionText">Room</span>
                                                <div className="optionCounter">
                                                    <button
                                                        className="optionCounterButton"
                                                        onClick={() => handleOption("room", "decrease")}
                                                        disabled={options.room <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="optionCounterNumber">
                                                        {options.room}
                                                    </span>
                                                    <button
                                                        className="optionCounterButton"
                                                        onClick={() => handleOption("room", "increase")}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    </div>
                                )}
                            </div>
                            <div className="headerSearchItem">
                                <button className="headerButton" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Header