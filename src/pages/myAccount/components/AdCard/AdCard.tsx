import "./AdCard.scss";

function AdCard () {

    return(
        <div className="ad-card">
                <div className="image-container">
                    <img src="/images/trx.jpg" alt="" />
                </div>
                <div className="main-container">
                    <div className="name-price">
                        <h2>Ram TRX 2022</h2>
                        <h3>$2,250,00.00</h3>
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