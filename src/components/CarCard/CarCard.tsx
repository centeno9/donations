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
                    <h2>{ad.title}</h2>
                </div>
                <h3 className="price">{ad.date}</h3>
                <h3 className="price">{ad.location}</h3>
            </div>
            <div className="see-more">
                <Link to={"/donacion/" + ad.id}>Ver más</Link>
            </div>
        </div>
    );
}

export default CarCard;