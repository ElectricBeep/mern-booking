import "./widget.scss";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const Widget = ({ type }) => {
    const [users, setUsers] = useState([]);
    const [precentage, setPrecentage] = useState(0);
    const [rooms, setRooms] = useState([]);
    const [roomPrecentage, setRoomPrecentage] = useState(0);

    const { data } = useFetch(type === "user" ? "/users/stats/permonth" : "/rooms/stats/roomstats");

    useEffect(() => {
        if (type === "user") {
            setUsers(data);
            setPrecentage((data[1]?.total * 100) / data[0]?.total - 100);
        } else {
            setRooms(data);
            setRoomPrecentage((data[1]?.total * 100) / data[0]?.total - 100);
        }
    }, [data, type]);

    return (
        <div className="widget">
            <div className="left">
                <span className="title">NEW {type.toUpperCase()}S</span>
                <span className="counter">
                    {type === "user" ? users[1]?.total : rooms[1]?.total}
                </span>
            </div>
            <div className="right">
                <span className="title">Compared to last month</span>
                <div className={`percentage ${precentage < 0 ? "negative" : "positive"}`}>
                    {(type === "user" ? precentage : roomPrecentage) < 0 ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />}
                    {type === "user" ? precentage : roomPrecentage} %
                </div>
            </div>
        </div>
    )
}

export default Widget