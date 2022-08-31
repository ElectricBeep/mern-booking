import "./datatable.scss";
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch"
import { useEffect, useState } from "react";
import axios from "axios";

const Datatable = ({ columns }) => {
    const [list, setList] = useState([]); //For deleting users

    //Deciding which page we are in
    const location = useLocation();
    const path = location.pathname.split("/")[1];

    const { data, error } = useFetch(`${process.env.REACT_APP_BASE_URL}/${path}`);

    useEffect(() => {
        setList(data);
    }, [data]);

    //Deleting users
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/${path}/${id}`);
        } catch (err) {
            error(err);
        };
        setList(list.filter((item) => item._id !== id)); //Deletes from web page
    };

    const actionColumn = [
        {
            field: "action", headerName: "Action", width: 200, renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row._id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },

    ];

    return (
        <div className="datatable">
            <div style={{ height: 600, width: "100%" }}>
                <div className="datatableTitle">
                    {path}
                    <Link to={`/${path}/new`} className="link">
                        Add New
                    </Link>
                </div>
                <DataGrid
                    className="datagrid"
                    rows={list}
                    columns={columns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                    getRowId={row => row._id}
                />
            </div>
        </div>
    )
}

export default Datatable