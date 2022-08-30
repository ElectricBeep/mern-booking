import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
    const { data, loading } = useFetch(`${process.env.REACT_APP_BASE_URL}hotels/countByCity?cities=Berlin,Madrid,London`);

    return (
        <div className="featured">
            {loading ? (
                "Loading, please wait..."
            ) : (
                <>
                    <div className="featuredItem">
                        <img
                            src="https://static.dw.com/image/43901161_6.jpg"
                            alt=""
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>Berlin</h1>
                            <h2>{data[0]}</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img
                            src="https://www.thetinybook.com/wp-content/uploads/2015/04/2-DAYS-IN-MILAN.jpg"
                            alt=""
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>Madrid</h1>
                            <h2>{data[1]}</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img
                            src="https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTYyNDg1MjE3MTI1Mjc5Mzk4/topic-london-gettyimages-760251843-promo.jpg"
                            alt=""
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>London</h1>
                            <h2>{data[2]}</h2>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Featured