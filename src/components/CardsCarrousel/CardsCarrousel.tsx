import CarCard from "../CarCard/CarCard";
import "./CardsCarrousel.scss";

function CardsCarrousel() {

    return (
        <div className="cards-corrousel">
            <div className="cards-container">
                <CarCard />
                <CarCard />
                <CarCard />
                <CarCard />
            </div>
            <div className="see-more-btn-container">
                <button>Ver todos</button>
            </div>
        </div>
    );
}

export default CardsCarrousel;