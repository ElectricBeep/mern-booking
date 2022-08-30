import "./tableComponent.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const TableComponent = ({ type }) => {
    const [users, setUsers] = useState([]);
    const [hotels, setHotels] = useState([]);

    const { data } = useFetch(type === "users" ? `${process.env.REACT_APP_BASE_URL}/users` : `${process.env.REACT_APP_BASE_URL}/hotels`);

    useEffect(() => {
        if (type === "users") {
            setUsers(data);
        } else {
            setHotels(data);
        }
    }, [data, type]);

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {type === "users" ? (
                            <>
                                <TableCell className="tableCell">User ID</TableCell>
                                <TableCell className="tableCell">Username</TableCell>
                                <TableCell className="tableCell">Email</TableCell>
                                <TableCell className="tableCell">Country</TableCell>
                                <TableCell className="tableCell">Phone</TableCell>
                                <TableCell className="tableCell">Created</TableCell>
                            </>
                        ) : (
                            <>
                                <TableCell className="tableCell">Property ID</TableCell>
                                <TableCell className="tableCell">Name</TableCell>
                                <TableCell className="tableCell">Address</TableCell>
                                <TableCell className="tableCell">City</TableCell>
                                <TableCell className="tableCell">Title</TableCell>
                                <TableCell className="tableCell">Distance</TableCell>
                            </>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {type === "users" ? users.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell className="tableCell">{user._id}</TableCell>
                            <TableCell className="tableCell">{user.username}</TableCell>
                            <TableCell className="tableCell">{user.email}</TableCell>
                            <TableCell className="tableCell">{user.country}</TableCell>
                            <TableCell className="tableCell">{user.phone}</TableCell>
                            <TableCell className="tableCell">{user.createdAt.slice(0, 7)}</TableCell>
                        </TableRow>
                    )) : hotels.slice(0, 5).map((hotel) => (
                        <TableRow key={hotel._id}>
                            <TableCell className="tableCell">{hotel._id}</TableCell>
                            <TableCell className="tableCell">{hotel.name}</TableCell>
                            <TableCell className="tableCell">{hotel.address}</TableCell>
                            <TableCell className="tableCell">{hotel.city}</TableCell>
                            <TableCell className="tableCell">{hotel.title}</TableCell>
                            <TableCell className="tableCell">{hotel.distance}{" "}m from center</TableCell>
                        </TableRow>
                    ))

                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent