import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
    const [file, setFile] = useState(""); //For adding image
    const [info, setInfo] = useState({}); //For adding user

    //Update state with input values
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    //Send data to cloudinary and mongo
    const handleClick = async (e) => {
        e.preventDefault();
        //For uploading to cloudinary
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads");
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dwbhufugp/image/upload",
                data
            );
            const { url } = uploadRes.data; //Getting image url for storing to mongo

            const newUser = { //Deciding what to send to mongo
                ...info,
                img: url
            };

            await axios.post("/auth/register", newUser);
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img src={file ? URL.createObjectURL(file) : "/assets/noImg.jpg"} alt="" />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadIcon className="icon" />
                                </label>
                                <input
                                    type="file" id="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            {inputs.map((input) => (
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
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default New