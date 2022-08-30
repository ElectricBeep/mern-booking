import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
    const { data, loading } = useFetch(`${process.env.REACT_APP_BASE_URL}hotels?featured=true&limit=4`);

    return (
        <div className="fp">
            {loading ? (
                "Loading, please wait..."
            ) : (
                <>
                    {data.map((item) => (
                        <div className="fpItem" key={item._id}>
                            <Link to={`/hotels/${item._id}`}>
                                <img
                                    src={item.photos[0]}
                                    alt=""
                                    className="fpImg"
                                />
                            </Link>
                            <Link to={`/hotels/${item._id}`} className="link">
                                <span className="fpName">{item.name}</span>
                            </Link>
                            <span className="fpCity">{item.city}</span>
                            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                            {item.rating && (
                                <div className="fpRating">
                                    <button>{item.rating}</button>
                                    <span>Excellent</span>
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default FeaturedProperties