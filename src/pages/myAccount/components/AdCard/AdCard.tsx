import "./AdCard.scss";

function AdCard ({ad, index}:any) {

    return(
        <div className="ad-card">
                <div className="image-container">
                    <img src={ad.images[0].imageUrl} alt="imagen del auto" />
                </div>
                <div className="main-container">
                    <div className="name-price">
                        <h2>{ad.title} - {ad.location}</h2>
                        <h3>{ad.date}</h3>
                    </div>
                    <div className="action-container">
                        <button className="edit-btn">Editar</button>
                        <button className="delete-btn">Eliminar</button>
                    </div>
                </div>
            </div>
    );
}

export default AdCard;