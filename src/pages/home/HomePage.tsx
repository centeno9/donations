import CardsCarrousel from '../../components/CardsCarrousel/CardsCarrousel';
import './HomePageStyles.scss';

function HomePage () {
    return(
        <div className="home-main-container">
            <div className='header'>
                <h1>Inicio</h1>
            </div>
            <div className='carrousel-container new-cars-container'>
                <div className='title'>
                    <h2>Autos nuevos</h2>
                </div>
                <CardsCarrousel />
            </div>
            <div className='carrousel-container seminew-cars-container'>
                <div className='title'>
                    <h2>Autos semi-nuevos</h2>
                </div>
                <CardsCarrousel />
            </div>
            <div className='carrousel-container seminew-cars-container'>
                <div className='title'>
                    <h2>Todos los autos</h2>
                </div>
                <CardsCarrousel />
            </div>
        </div>
    );
}

export default HomePage;