import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import CardsCarrousel from "../../components/CardsCarrousel/CardsCarrousel";
import Filter from "../../components/Filter/Filter";
import { PublicityModal } from "../../components/PublicityModal/PublicityModal";

import { db } from "../../config/firebase";
import "./HomePageStyles.scss";

function HomePage() {
  const [ads, setAds] = useState<Array<any>>([]);
  const [modalShow, setModalShow] = useState<boolean>(true);

  const getAds = async () => {
    let adsArray = new Array();

    const q = query(collection(db, "ads"));

    const querySnapshot = await getDocs(q);
    await Promise.all(
      querySnapshot.docs.map((doc) => {
        const data: any = { id: doc.id, ...doc.data() };

        adsArray.push(data);
      })
    );

    setAds(adsArray);
  };

  useEffect(() => {
    getAds();
  }, []);

  return (
    <div className="home-main-container">
      <PublicityModal show={modalShow} onHide={() => setModalShow(false)} />
      <div className="ad-publicity-space">Espacio publicitario</div>
      <div className="header">
        <h1>Inicio</h1>
      </div>
      <div className="carrousel-container seminew-cars-container">
        <div className="title">
          <h2>Donaciones destacadas</h2>
        </div>
        <CardsCarrousel ads={ads} type={"recientes"} />
      </div>
      <div className="ad-publicity-space">Espacio publicitario</div>
    </div>
  );
}

export default HomePage;
