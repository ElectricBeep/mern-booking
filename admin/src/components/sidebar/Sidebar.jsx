import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext);

    const { dispatch: authDispatch } = useContext(AuthContext);

    const handleLogout = () => {
        authDispatch({ type: "LOGOUT" });
    }

    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">BookerAdmin.</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">LISTS</p>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/hotels" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className="icon" />
                            <span>Hotels</span>
                        </li>
                    </Link>
                    <li>
                        <Link to="/rooms" style={{ textDecoration: "none" }}>
                            <CreditCardIcon className="icon" />
                            <span>Rooms</span>
                        </Link>
                    </li>
                    <p className="title">USEFUL</p>
                    <li>
                        <NotificationsNoneIcon className="icon" />
                        <Link to="/notifications" style={{ textDecoration: "none" }}>
                            <span>Notifications</span>
                        </Link>
                    </li>
                    <p className="title">USER</p>
                    <li onClick={handleLogout}>
                        <ExitToAppIcon className="icon" />
                        <span>Log Out</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
                <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>
            </div>
        </div>
    )
}

export default Sidebar