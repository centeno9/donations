import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CarCard from "../../components/CarCard/CarCard";
import Filter from "../../components/Filter/Filter";
import { db } from "../../config/firebase";
import { AdsCard, searchParams } from "../../interfaces/Ads";
import "./SearchPage.scss";

export function SearchPage() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState<searchParams>({
        brand: searchParams.get("marca") ? searchParams.get("marca")!.toString() : "todos",
        type: searchParams.get("tipo") ? searchParams.get("tipo")!.toString() : "todos",
        minPrice: searchParams.get("minPrecio") ? searchParams.get("minPrecio")!.toString() : "todos",
        maxPrice: searchParams.get("maxPrecio") ? searchParams.get("maxPrecio")!.toString() : "todos",
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [ads, setAds] = useState<Array<AdsCard>>(new Array());

    const getSearch = async () => {
        setLoading(true);
        console.log(search)
        let adsArray = new Array();

        const q = query(collection(db, "ads"),
            where("brand", (search.brand !== "todos") ? "==" : "!=", search.brand)
        );

        const querySnapshot = await getDocs(q);


        querySnapshot.forEach((ad) => {
            adsArray.push({ id: ad.id, ...ad.data() });
        });

        if (search.type !== "todos") {
            adsArray = adsArray.filter(e => e.type === search.type);
        }

        adsArray = adsArray.filter(e => e.price >= (search.minPrice !== "todos" ? parseInt(search.minPrice!) : 0) && e.price <= (search.maxPrice !== "todos" ? parseInt(search.maxPrice!) : 999999999))

        setAds(adsArray)
        setLoading(false);
    }

    useEffect(() => {
        getSearch();
    }, [search]);

    useEffect(() => {
        console.log(searchParams.get("marca"))
        setSearch({
            brand: searchParams.get("marca") ? searchParams.get("marca")!.toString() : "todos",
            type: searchParams.get("tipo") ? searchParams.get("tipo")!.toString() : "todos",
            minPrice: searchParams.get("minPrecio") ? searchParams.get("minPrecio")!.toString() : "todos",
            maxPrice: searchParams.get("maxPrecio") ? searchParams.get("maxPrecio")!.toString() : "todos",
        });
    }, [searchParams])


    return (
        <div className="search-page-main-container">
            <div className="header">
                <h1>Búscar</h1>
            </div>
            <div className="filter-container">
                <div className='title'>
                    <h2>Búsqueda personalizada</h2>
                </div>
                <Filter searchParams={search} />
            </div>
            {loading ? (
                <div className="loading-container">
                    <div className="spinner-border text-danger" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            ) : (
                <div className="search-cards-container">
                    {ads.length > 0 ? (
                        ads.map((ad, index) => {
                            return (
                                <CarCard ad={ad} key={"search-card-card-" + index} />
                            )
                        })
                    ) : (
                        <h2>No hay resultados con los datos proporcionados</h2>
                    )}
                </div>
            )}
        </div>
    );
}