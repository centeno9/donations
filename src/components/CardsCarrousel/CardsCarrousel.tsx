import { Link } from "react-router-dom";
import CarCard from "../CarCard/CarCard";
import "./CardsCarrousel.scss";

function CardsCarrousel({ ads, type }: any) {

    return (
        <div className="cards-corrousel">
            <div className="cards-container">
                {ads.map((ad: any, index: number) => {
                    return (
                        <CarCard ad={ad} index={index} key={type + "-car-card-" + index} />
                    )
                })}
            </div>
            <div className="see-more-btn-container">
                <Link to={"/autos/" + type}>
                    <button>Ver todos</button>
                </Link>
            </div>
        </div>
    );
}

export default CardsCarrousel;