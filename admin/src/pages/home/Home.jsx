import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import TableComponent from "../../components/table/TableComponent";

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="user" />
                    <Widget type="room" />
                </div>
                <div className="charts">
                    {/* <Featured /> */}
                    <Chart title={"Last 6 Months (Registrated Users)"} />
                </div>
                <div className="listsContainer">
                    <div className="listContainer">
                        <div className="listTitle">Latest Users</div>
                        <TableComponent type="users" />
                    </div>
                    <div className="listContainer">
                        <div className="listTitle">Latest Properties</div>
                        <TableComponent type="hotels" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home