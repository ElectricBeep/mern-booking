import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
    return (
        <div className="searchItem">
            <Link to={`/hotels/${item._id}`} className="link">
                <img
                    src={item.photos[0]}
                    alt=""
                    className="searchItemImg"
                />
            </Link>
            <div className="searchItemDesc">
                <Link to={`/hotels/${item._id}`} className="link">
                    <h1 className="searchItemTitle">{item.name}</h1>
                </Link>
                <span className="searchItemDistance">{item.distance}m from center</span>
                <span className="searchItemTaxiOp">Free airport taxi</span>
                <span className="searchItemSubtitle">
                    Studio Apartment with Air Conditioning
                </span>
                <span className="searchItemFeatures">
                    {item.desc} • {item.desc}
                </span>
                <span className="searchItemCancelOp">Free cancellation </span>
                <span className="searchItemCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="searchItemDetails">
                {item.rating && (
                    <div className="searchItemRating">
                        <span>Excellent</span>
                        <button>{item.rating}</button>
                    </div>
                )}
                <div className="searchItemDetailTexts">
                    <span className="searchItemPrice">${item.cheapestPrice}</span>
                    <span className="searchItemTaxOp">Includes taxes and fees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="searchItemCheckButton">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchItem