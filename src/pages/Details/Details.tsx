import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdQuestionsCard } from "../../components/AdQuestions/AdQuestionsCard";
import { PublicityModal } from "../../components/PublicityModal/PublicityModal";
import { db } from "../../config/firebase";
import "./Details.scss";

function Details({}) {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [ad, setAd]: any = useState({});
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage]: any = useState({});
  const [modalShow, setModalShow] = useState<boolean>(true);

  const getAd = async () => {
    const docRef = doc(db, "ads", params.id as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setAd({ id: docSnap.id, ...docSnap.data() });
      setSelectedImage({ ...docSnap.data().images[0] });
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      navigate("/");
    }
  };
  useEffect(() => {
    getAd();
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <div className="details-car-main-container">
      <PublicityModal show={modalShow} onHide={() => setModalShow(false)} />
      <div className="header">
        <h1>Detalles</h1>
      </div>
      <div className="ad-publicity-space">Espacio publicitario</div>
      <div className="details-car-card">
        <div className="card-content">
          <div className="main-content">
            <div className="d-flex flex-column">
              <div className="image-container">
                <img src={selectedImage.imageUrl} alt="imagen del auto" />
              </div>
              <div className="image-selector-container">
                {ad.images.map((i: any, index: number) => (
                  <img
                    src={i.imageUrl}
                    alt=""
                    className="small-image-preview"
                    onClick={() => setSelectedImage(i)}
                    key={"ad-card-image-" + index}
                  />
                ))}
              </div>
            </div>
            <div className="info-container">
              <div>
                <h2>{ad.title}</h2>
                <h3 className="price">{ad.date}</h3>
                <h3>{ad.location}</h3>
              </div>
              <div className="description-container">
                <h2>Contacto</h2>
                <p>{ad.contact}</p>
              </div>
            </div>
          </div>
          <div className="secondary-content">
            <div className="description-container">
              <h2>Descripción</h2>
              <p>{ad.description}</p>
            </div>
          </div>
        </div>
      </div>
      <AdQuestionsCard adId={ad.id} adUserId={ad.userId} />
    </div>
  );
}

export default Details;
