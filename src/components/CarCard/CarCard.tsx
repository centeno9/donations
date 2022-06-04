import { Link } from "react-router-dom";
import "./CarCardStyles.scss";

function CarCard() {

    return (
        <div className="card-card-main-container">
            <div className="image-container">
                <img src="/images/trx.jpg" alt="imagen del carro" />
            </div>
            <div className="info-container">
                <div className="title">
                    <h2>Ram TRX</h2>
                    <h2>2022</h2>
                </div>
                <h3 className="price">$2,250,000.00</h3>
                <h3 className="kilometer">110 km</h3>
            </div>
            <div className="see-more">
                <Link to={"auto"}>Ver más</Link>
            </div>
        </div>
    );
}

export default CarCard;