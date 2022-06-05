import "./AdCard.scss";

function AdCard ({ad, index}:any) {

    return(
        <div className="ad-card">
                <div className="image-container">
                    <img src={ad.images[0].imageUrl} alt="imagen del auto" />
                </div>
                <div className="main-container">
                    <div className="name-price">
                        <h2>{ad.brand} {ad.model} {ad.year}</h2>
                        <h3>$ {parseInt(ad.price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
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