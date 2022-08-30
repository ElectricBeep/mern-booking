import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
    const location = useLocation(); //Getting state from useNavigation in Header.jsx
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [min, setMin] = useState(undefined); //For searching by price
    const [max, setMax] = useState(undefined); //For searching by price

    const { data, loading, error, reFetch } = useFetch(
        `${process.env.REACT_APP_BASE_URL}hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
    );
    //Taking destination from state

    const handleClick = () => {
        reFetch();
    };

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="listSearchTitle">Search</h1>
                        <div className="listSearchItem">
                            <label>Destination</label>
                            <input
                                type="text"
                                placeholder={destination}
                                onChange={(e) => setDestination(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                            />
                        </div>
                        <div className="listSearchItem">
                            <label>Check-in Date</label>
                            <span onClick={() => setOpenDate(!openDate)}>
                                {`${format(
                                    dates[0].startDate,
                                    "MM/dd/yyyy"
                                )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                            </span>
                            {openDate && (
                                <DateRange
                                    onChange={(item) => setDates([item.selection])}
                                    minDate={new Date()}
                                    ranges={dates}
                                />
                            )}
                        </div>
                        <div className="listSearchItem">
                            <label>Options</label>
                            <div className="listSearchItemOptions">

                                <div className="listSearchOptionItem">
                                    <span className="listSearchOptionText">
                                        Min Price <small>per night</small>
                                    </span>
                                    <input
                                        type="number"
                                        className="listSearchOptionInput"
                                        onChange={(e) => setMin(e.target.value)}
                                    />
                                </div>
                                <div className="listSearchOptionItem">
                                    <span className="listSearchOptionText">
                                        Max Price <small>per night</small>
                                    </span>
                                    <input
                                        type="number"
                                        className="listSearchOptionInput"
                                        onChange={(e) => setMax(e.target.value)}
                                    />
                                </div>
                                <div className="listSearchOptionItem">
                                    <span className="listSearchOptionText">
                                        Adult
                                    </span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="listSearchOptionInput"
                                        placeholder={options.adult}
                                    />
                                </div>
                                <div className="listSearchOptionItem">
                                    <span className="listSearchOptionText">
                                        Children
                                    </span>
                                    <input
                                        type="number"
                                        min={0}
                                        className="listSearchOptionInput"
                                        placeholder={options.children}
                                    />
                                </div>
                                <div className="listSearchOptionItem">
                                    <span className="listSearchOptionText">
                                        Room
                                    </span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="listSearchOptionInput"
                                        placeholder={options.room}
                                    />
                                </div>
                            </div>
                            <button onClick={handleClick}>Search</button>
                        </div>
                    </div>
                    <div className="listResult">
                        {loading ? (
                            "Loading, please wait..."
                        ) : (
                            <>
                                {data.map((item) => (
                                    <SearchItem key={item._id} item={item} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List