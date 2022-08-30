import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useState } from "react";
import axios from "axios";
import { hotelInputs } from "../../fromSource";
import useFetch from "../../hooks/useFetch";

const NewHotel = () => {
    const [files, setFiles] = useState(""); //For adding image
    const [info, setInfo] = useState({}); //For adding hotel
    const [rooms, setRooms] = useState([]); //For rooms

    //Get Rooms data
    const { data, loading, error } = useFetch(`${process.env.REACT_APP_BASE_URL}/rooms`);

    //Update state with input values
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    //Transform HTML collection to array
    const handleSelect = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setRooms(value);
    };

    //Send data to cloudinary and mongo
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "uploads");

                    const uploadRes = await axios.post(
                        process.env.REACT_APP_UPLOAD_URL,
                        data
                    );
                    const { url } = uploadRes.data; //Getting image url for storing to mongo

                    return url;
                })
            );

            const newHotel = {
                ...info,
                rooms,
                photos: list
            };

            await axios.post(`${process.env.REACT_APP_BASE_URL}/hotels`, newHotel);
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
                    <h1>Add New Hotel</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img src={files ? URL.createObjectURL(files[0]) : "/assets/noImg.jpg"} alt="" />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => setFiles(e.target.files)}
                                    multiple
                                />
                            </div>
                            {hotelInputs.map((input) => (
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
                                <label>Featured</label>
                                <select id="featured" onChange={handleChange}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                            <div className="selectRooms">
                                <label>Rooms</label>
                                <select multiple id="rooms" onChange={handleSelect}>
                                    {loading
                                        ? "Loading, please wait..."
                                        : data &&
                                        data.map((room) => (
                                            <option key={room._id} value={room._id}>
                                                {room.title}
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

export default NewHotel