import { NavLink, Outlet } from "react-router-dom";
import "./CarsPageStyles.scss";

function CarsPage() {
  return (
    <div className="my-account-main-container">
      <div className="ad-publicity-space">Espacio publicitario</div>
      <div className="header-container">
        <h1>Anuncios</h1>
      </div>
      <div className="my-account-nav-tabs">
        <NavLink to="recientes">
          <div className="tab">
            <h2>Recientes</h2>
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
  );
}

export default CarsPage;
