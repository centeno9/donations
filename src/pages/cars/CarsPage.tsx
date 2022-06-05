import { NavLink, Outlet } from "react-router-dom";
import "./CarsPageStyles.scss";

function CarsPage() {
    return(
        <div className="my-account-main-container">
            <div className="header-container">
                <h1>Autos</h1>
            </div>
            <div className="my-account-nav-tabs">
                <NavLink to="nuevos">
                    <div className="tab">
                        <h2>Nuevos</h2>
                    </div>
                </NavLink>
                <NavLink to="seminuevos">
                    <div className="tab">
                        <h2>Seminuevos</h2>
                    </div>
                </NavLink>
                <NavLink to="todos">
                    <div className="tab">
                        <h2>Todos</h2>
                    </div>
                </NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default CarsPage;