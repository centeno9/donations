import CarCard from "../CarCard/CarCard";
import "./CardsCarrousel.scss";

function CardsCarrousel({ads}:any) {

    return (
        <div className="cards-corrousel">
            <div className="cards-container">
                {ads.map((ad: any, index: any) => {
                    return(
                        <CarCard ad={ad} index={index} />
                    )
                })}
            </div>
            <div className="see-more-btn-container">
                <button>Ver todos</button>
            </div>
        </div>
    );
}

export default CardsCarrousel;