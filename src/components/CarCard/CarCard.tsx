import { Link } from "react-router-dom";
import "./CarCardStyles.scss";

function CarCard({ ad, index }: any) {

    return (
        <div className="card-card-main-container">
            <div className="image-container">
                <img src={ad.images[0].imageUrl} alt="imagen del carro" />
            </div>
            <div className="info-container">
                <div className="title">
                    <h2>{ad.brand} {ad.model}</h2>
                    <h2>{ad.year}</h2>
                </div>
                <h3 className="price">$ {parseInt(ad.price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
                <h3 className="kilometer">{ad.km.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} km</h3>
            </div>
            <div className="see-more">
                <Link to={"/auto/" + ad.id}>Ver más</Link>
            </div>
        </div>
    );
}

export default CarCard;