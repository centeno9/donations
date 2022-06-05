import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import CardsCarrousel from '../../components/CardsCarrousel/CardsCarrousel';
import { db } from '../../config/firebase';
import './HomePageStyles.scss';

function HomePage() {

    const [newCars, setNewCars] = useState<Array<any>>([])
    const [semiNewCars, setSemiNewCars] = useState<Array<any>>([])
    const [allCars, setAllCars] = useState<Array<any>>([])

    const getAds = async () => {

        let newCarsArray = new Array();
        let semiNewCarsArray = new Array();
        let allCarsArray = new Array();
        
        const q = query(collection(db, "ads"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            const data:any = {id: doc.id, ...doc.data()};

            if(data.state === "nuevo") {
                newCarsArray.push(data);
            } else {
                semiNewCarsArray.push(data);
            }
            allCarsArray.push(data);

        });

        setAllCars(allCarsArray);
        setSemiNewCars(semiNewCarsArray);
        setNewCars(newCarsArray);
    }

    useEffect(() => {
        getAds();
    }, [])

    return (
        <div className="home-main-container">
            <div className='header'>
                <h1>Inicio</h1>
            </div>
            <div className='carrousel-container new-cars-container'>
                <div className='title'>
                    <h2>Autos nuevos</h2>
                </div>
                <CardsCarrousel ads={newCars} type={"nuevos"} />
            </div>
            <div className='carrousel-container seminew-cars-container'>
                <div className='title'>
                    <h2>Autos semi-nuevos</h2>
                </div>
                <CardsCarrousel ads={semiNewCars} type={"seminuevos"} />
            </div>
            <div className='carrousel-container seminew-cars-container'>
                <div className='title'>
                    <h2>Todos los autos</h2>
                </div>
                <CardsCarrousel ads={allCars} type={"todos"} />
            </div>
        </div>
    );
}

export default HomePage;