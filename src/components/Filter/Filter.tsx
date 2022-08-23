import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { prices, carTypes, Brands } from "../../functions/Constantes";
import { priceFormatter } from "../../functions/Functions";
import { searchParams } from "../../interfaces/Ads";
import "./Filter.scss";

interface filterProps {
    searchParams?: searchParams;
}

function Filter(props: filterProps) {

    const navigate = useNavigate();
    const [search, setSearch] = useState(props.searchParams !== undefined ? props.searchParams : { brand: "todos", type: "todos", minPrice: "todos", maxPrice: "todos" });

    const goSearch = () => {
        navigate(`/buscar?marca=${search.brand}&tipo=${search.type}&minPrecio=${search.minPrice}&maxPrecio=${search.maxPrice}`, {replace: true});
    }

    return (
        <form className="filter-component-main-container">
            <div className="inputs-container">
                <div className="input-container">
                    <label htmlFor="car-brand">Marca:</label>
                    <div className="input-box">
                        <select name="card-brand" id="car-brand" value={search.brand} onChange={e => setSearch({ ...search, brand: e.target.value })}>
                            <option value="todos">Todas</option>
                            {Brands.map((brand, index) => {
                                return (
                                    <option value={brand} key={"car-brand-" + index}>{brand}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="input-container">
                    <label htmlFor="car-type">Tipo:</label>
                    <div className="input-box">
                        <select name="card-type" id="car-type" value={search.type} onChange={e => setSearch({ ...search, type: e.target.value })}>
                            <option value="todos">Cualquier</option>
                            {carTypes.map((type, index) => {
                                return (
                                    <option value={type} key={"car-type-" + index}>{type}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="input-container">
                    <label htmlFor="min-price-range">Precio minimo:</label>
                    <div className="input-box">
                        <select name="min-price-range" id="min-price-range" value={search.minPrice} onChange={e => setSearch({ ...search, minPrice: e.target.value })}>
                            <option value="todos">Sin límite</option>
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
                        <select name="max-price-range" id="max-price-range" value={search.maxPrice} onChange={e => setSearch({ ...search, maxPrice: e.target.value })}>
                            <option value="todos">Sin límite</option>
                            {prices.map((price, index) => {
                                return (
                                    <option value={price} key={"max-price-" + index}>{priceFormatter.format(price)}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <button className="primary-action-btn" type="button" onClick={goSearch}>Búscar</button>
        </form>
    );
}

export default Filter;