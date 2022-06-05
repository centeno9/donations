import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../config/firebase";
import { useAuth } from "../../../../Context/UserContext";
import AdCard from "../../components/AdCard/AdCard";
import NewAdModal from "../../components/NewAdModal/NewAdModal";
import "./MyAdsContent.scss";

function MyAdsContent() {

    const [show, setShow] = useState(false);
    const user = useAuth().user;
    const [ads, setAds] = useState<Array<any>>([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAds = async () => {
        const q = query(collection(db, "ads"), where("userId", "==", user.id));

        let adsArray = new Array();

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            adsArray = [];
            querySnapshot.forEach((doc) => {
                adsArray.push({ id: doc.id, ...doc.data() });
            });
            setAds(adsArray);
          });

    }

    useEffect(() => {
        getAds();
    }, [])

    return (
        <>
            <NewAdModal show={show} handleClose={handleClose} />
            <div className="my-ads-main-container">
                <div className="header">
                    <button className="new-ad" onClick={handleShow}>Nuevo anuncio</button>
                </div>
                {ads.length > 0 ? (
                    <>
                        {ads.map((ad, index) => {
                            return (
                                <AdCard ad={ad} index={index} key={"ad-card-" + index} />
                            )
                        })}
                    </>
                ) : (
                    <h2>Aún no tienes anuncios</h2>
                )}
            </div>
        </>
    );
}

export default MyAdsContent;