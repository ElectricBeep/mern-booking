import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./register.css";

const Register = () => {
    const [credentials, setCredentials] = useState("");

    const handleChange = (e) => {
        setCredentials((prev) => {
            return {
                ...prev, [e.target.id]: e.target.value
            }
        });
    };

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const register = async () => {
            try {
                const res = await axios.post("https://mernbooking-backend.herokuapp.com/api/auth/register", credentials);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }
        };
        register();
    };

    return (
        <>
            <Navbar />
            <div className="register">
                <div className="rContainer">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="email"
                        id="email"
                        className="rInput"
                        onChange={handleChange}
                    />
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="username"
                        id="username"
                        className="rInput"
                        onChange={handleChange}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        id="password"
                        className="rInput"
                        onChange={handleChange}
                    />
                    <label>Counrty</label>
                    <input
                        type="text"
                        placeholder="country"
                        id="country"
                        className="rInput"
                        onChange={handleChange}
                    />
                    <label>City</label>
                    <input
                        type="text"
                        placeholder="city"
                        id="city"
                        className="rInput"
                        onChange={handleChange}
                    />
                    <label>Phone</label>
                    <input
                        type="text"
                        placeholder="phone number"
                        id="phone"
                        className="rInput"
                        onChange={handleChange}
                    />
                    <button className="registerButton" onClick={handleRegister}>
                        Register
                    </button>
                </div>
            </div>
        </>
    )
}

export default Register