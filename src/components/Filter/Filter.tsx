import { prices, carTypes } from "../../functions/Constantes";
import { priceFormatter } from "../../functions/Functions";
import "./Filter.scss";

function Filter() {
    return (
        <form className="filter-component-main-container">
            <div className="inputs-container">
                <div className="input-container">
                    <label htmlFor="car-brand">Marca:</label>
                    <div className="input-box">
                        <select name="card-brand" id="car-brand">
                            <option value="all">Todas</option>
                        </select>
                    </div>
                </div>
                <div className="input-container">
                    <label htmlFor="car-type">Tipo:</label>
                    <div className="input-box">
                        <select name="card-type" id="car-type">
                            <option value="all">Cualquier</option>
                            {carTypes.map((type, index) => {
                                return(
                                    <option value={type} key={"car-type-" + index}>{type}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="input-container">
                    <label htmlFor="min-price-range">Precio minimo:</label>
                    <div className="input-box">
                        <select name="min-price-range" id="min-price-range">
                            <option value="all">Sin límite</option>
                            {prices.map((price, index) => {
                                return (
                                    <option value={price} key={"min-price-" + index}>{priceFormatter.format(price)}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="input-container">
                    <label htmlFor="max-price-range">Precio máximo:</label>
                    <div className="input-box">
                        <select name="max-price-range" id="max-price-range">
                            <option value="all">Sin límite</option>
                            {prices.map((price, index) => {
                                return (
                                    <option value={price} key={"max-price-" + index}>{priceFormatter.format(price)}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <button className="primary-action-btn">Búscar</button>
        </form>
    );
}

export default Filter;