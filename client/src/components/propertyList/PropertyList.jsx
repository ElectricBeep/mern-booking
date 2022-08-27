import "./propertyList.css";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
    const { data, loading } = useFetch("https://mernbooking-backend.herokuapp.com/api/hotels/countByType");

    const images = [
        "https://t-cf.bstatic.com/xdata/images/hotel/square200/244759766.webp?k=e87b68540513c463079b85ec084d1ee3b801f8b139df32e137efda0b74757ec2&o=",
        "https://t-cf.bstatic.com/xdata/images/hotel/square200/74519851.webp?k=232b35ab4f754f97f92c81906384ff8ad35550d3db44541d93e8d977d3f58cb2&o=",
        "https://t-cf.bstatic.com/xdata/images/hotel/square200/190182226.webp?k=a44b5672d9cda415f2191ec95e43f6cdcc452b760e69c5607231e25a0f1b8921&o=&s=1",
        "https://t-cf.bstatic.com/xdata/images/hotel/square200/218379872.webp?k=a96806fbfe8bed643f52a1d3883f0006d3fe3c46b769c3c1d9dbc9afe939f859&o=&s=1",
        "https://t-cf.bstatic.com/xdata/images/hotel/square200/253095214.webp?k=fcdca1f1e076b581e67af93849aca04b3673087659dbdeb781441fa973dc2a4d&o=&s=1"
    ];

    return (
        <div className="pList">
            {loading ? (
                "Loading, please wait..."
            ) : (
                <>
                    {data && images.map((image, i) => (
                        <div className="pListItem" key={i}>
                            <img
                                src={image}
                                alt=""
                                className="pListImg"
                            />
                            <div className="pListTitles">
                                <h1>{data[i]?.type}</h1>
                                <h2>{data[i]?.count} {data[i]?.type}s</h2>
                            </div>
                        </div>
                    ))
                    }
                </>
            )}
        </div>
    )
}

export default PropertyList