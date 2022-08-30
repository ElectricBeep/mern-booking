import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";

import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";

const Single = () => {
    const [dataItem, setDataItem] = useState({});

    const location = useLocation();
    const page = location.pathname.split("/")[1];
    const path = location.pathname;

    const { data } = useFetch(`${process.env.REACT_APP_BASE_URL}${path}`);

    useEffect(() => {
        setDataItem(data);
    }, [data]);

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <h1 className="title">Information</h1>
                        <div className="item">
                            {page === "users" && (
                                <>
                                    <img
                                        src={dataItem?.img ? dataItem.img : "/assets/noImg.jpg"}
                                        alt=""
                                        className="itemImg"
                                    />
                                    <div className="details">
                                        <h1 className="itemTitle">{dataItem?.username}</h1>
                                        <div className="detailItem">
                                            <span className="itemKey">Email:</span>
                                            <span className="itemValue">{dataItem?.email}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Phone:</span>
                                            <span className="itemValue">{dataItem?.phone}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">City:</span>
                                            <span className="itemValue">{dataItem?.city}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Country:</span>
                                            <span className="itemValue">{dataItem?.country}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Created:</span>
                                            <span className="itemValue">{dataItem?.createdAt?.slice(0, 10)}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                            {page === "rooms" && (
                                <>
                                    <div className="details">
                                        <h1 className="itemTitle">{dataItem?.title}</h1>
                                        <div className="detailItem">
                                            <span className="itemKey">Price:</span>
                                            <span className="itemValue">{dataItem?.price}$</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Max People:</span>
                                            <span className="itemValue">{dataItem?.maxPeople}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Description:</span>
                                            <span className="itemValue">{dataItem?.desc}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Rooms:</span>
                                            <span className="itemValue">
                                                {dataItem?.roomNumbers?.map((room) => (
                                                    <span className="itemValue" key={room._id}>
                                                        {room?.number}<span style={{ color: "red" }}> | </span>
                                                    </span>
                                                ))}
                                            </span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">
                                                {dataItem?.roomNumbers[0]?.number}{" "}unavailable dates:
                                            </span>
                                            <span className="itemValue">
                                                {dataItem?.roomNumbers[0].unavailableDates?.map((date, index) => (
                                                    <div key={index}>
                                                        <span>{moment(date).format("MMM Do YY")}<span style={{ color: "red" }}> | </span></span>
                                                    </div>
                                                ))}
                                            </span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">
                                                {dataItem?.roomNumbers[1]?.number}{" "}unavailable dates:
                                            </span>
                                            <span className="itemValue">
                                                {dataItem?.roomNumbers[1]?.unavailableDates?.map((date, index) => (
                                                    <div key={index}>
                                                        <span>{moment(date).format("MMM Do YY")}<span style={{ color: "red" }}> | </span></span>
                                                    </div>
                                                ))}
                                            </span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">
                                                {dataItem?.roomNumbers[2]?.number}{" "}unavailable dates:
                                            </span>
                                            <span className="itemValue">
                                                {dataItem?.roomNumbers[2]?.unavailableDates?.map((date, index) => (
                                                    <div key={index}>
                                                        <span>{moment(date).format("MMM Do YY")}<span style={{ color: "red" }}> | </span></span>
                                                    </div>
                                                ))}
                                            </span>
                                        </div> */}
                                    </div>
                                </>
                            )}
                            {page === "hotels" && (
                                <>
                                    <div className="details">
                                        <h1 className="itemTitle">{dataItem?.name}</h1>
                                        <div className="detailItem">
                                            <span className="itemKey">Type:</span>
                                            <span className="itemValue">{dataItem?.type}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">City:</span>
                                            <span className="itemValue">{dataItem?.city}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Address:</span>
                                            <span className="itemValue">{dataItem?.address}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Rooms:</span>
                                            <span className="itemValue">
                                                {dataItem?.rooms?.length}
                                            </span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Title:</span>
                                            <span className="itemValue">
                                                {dataItem?.title}
                                            </span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Photos:</span>
                                            <div className="itemPhotoContainer">
                                                {dataItem?.photos?.map((photo) => (
                                                    <img key={photo} src={photo} width="100px" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="right">
                        <div className="left">
                            <h1 className="title">Edit Comming Soon</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Single