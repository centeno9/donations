import { useState } from "react";
import AdCard from "../../components/AdCard/AdCard";
import NewAdModal from "../../components/NewAdModal/NewAdModal";
import "./MyAdsContent.scss";

function MyAdsContent() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <NewAdModal show={show}  handleClose={handleClose} />
            <div className="my-ads-main-container">
                <div className="header">
                    <button className="new-ad" onClick={handleShow}>Nuevo anuncio</button>
                </div>
                <AdCard />
            </div>
        </>
    );
}

export default MyAdsContent;