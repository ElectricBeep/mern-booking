import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { roomInputs } from "../../fromSource";
import useFetch from "../../hooks/useFetch";

const NewRoom = () => {
    const [info, setInfo] = useState({}); //For adding room
    const [hotelId, setHotelId] = useState(undefined); //To get hotel id
    const [rooms, setRooms] = useState([]); //for adding room numbers

    //Get Rooms data
    const { data, loading, error } = useFetch("/hotels");

    //Update state with input values
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    //Send data to cloudinary and mongo
    const handleClick = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(",").map((room) => ({ number: room })); //We need room
        //numbers to be inside object since Room.js model
        try {
            await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
        } catch (err) {
            error(err);
        };
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Room</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            {roomInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        id={input.id}
                                    />
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Rooms</label>
                                <textarea
                                    placeholder="type comma between room numbers"
                                    onChange={(e) => setRooms(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <label>Choose a hotel</label>
                                <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                                    {loading
                                        ? "Loading, please wait..."
                                        : data && data.map((hotel) => (
                                            <option key={hotel._id} value={hotel._id}>
                                                {hotel.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewRoom