import "./News.scss";
import { useEffect, useState } from "react";
import CarCard from "../../../../components/CarCard/CarCard";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../../../config/firebase";

function News() {
    const [ads, setAds] = useState<Array<any>>([])

    const getCars = async () => {
        const q = query(collection(db, "ads"), where("state", "==", "nuevo"));

        let adsArray = new Array();
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            adsArray.push({ id: doc.id, ...doc.data() });

        });

        setAds(adsArray);
    }

    useEffect(() => {
        getCars()
    }, []);

    return (
        <div className="show-all-cards-type-container">
            {ads.map((ad: any, index: any) => {
                return (
                    <CarCard ad={ad} index={index} />
                )
            })}
        </div>
    )
}

export default News;