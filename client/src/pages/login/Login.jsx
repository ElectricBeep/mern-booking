import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("https://mernbooking-backend.herokuapp.com/api/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    return (
        <>
            <Navbar />
            <div className="login">
                <div className="lContainer">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="username"
                        id="username"
                        onChange={handleChange}
                        className="lInput"
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        id="password"
                        onChange={handleChange}
                        className="lInput"
                    />
                    <button disabled={loading} onClick={handleClick} className="lButton">
                        Login
                    </button>
                    {error && <span>{error.message}</span>}
                </div>
                <div className="lFooter">
                    <div className="lFooterText">
                        By signing in or creating an account, you agree with our Terms &
                        <br />
                        Conditions and Privacy Statement
                    </div>
                    <div className="lFooterCopyright">
                        All rights reserved.
                        <br />
                        Copyright (2009-2022) – Booker™
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login