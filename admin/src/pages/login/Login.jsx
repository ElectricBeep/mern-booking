// import { useContext, useState } from "react";
// import "./login.scss";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

// const Login = () => {

//     const [error, setError] = useState(false);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const naviagte = useNavigate();

//     const { dispatch } = useContext(AuthContext);

//     const handleLogin = (e) => {
//         e.preventDefault();

//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {

//                 const user = userCredential.user;
//                 dispatch({ type: "LOGIN", payload: user });
//                 naviagte("/");
//             })
//             .catch((error) => {
//                 setError(true);
//             });
//     };
//     // firebase login

//     return (
//         <div className="login">
//             <form onSubmit={handleLogin}>
//                 <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
//                 <input type="passowrd" placeholder="password" onChange={e => setPassword(e.target.value)} />
//                 <button type="submit">Login</button>
//                 {error && <span>Wrong email or password!</span>}
//             </form>
//         </div>
//     )
// }

// export default Login





import { useContext, useState } from "react";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            if (res.data.isAdmin) {
                navigate("/");
            } else {
                dispatch({ type: "LOGIN_FAILURE", payload: { message: "You are not allowed!" } });
            };
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    return (
        <div className="login">
            <div className="lContainer">
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}
                    className="lInput"
                />
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
        </div>
    )
}

export default Login