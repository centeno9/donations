import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/UserContext';
import './MyAccountPageStyles.scss';

function MyAccountPage() {

    const logout = useAuth().logout;

    const signout = () => {
        logout();
    }

    return (
        <div className="my-account-main-container">
            <div className="header-container">
                <h1>Mi cuenta</h1>
                <button onClick={signout} className='sign-out-btn'>Cerrar sesión</button>
            </div>
            <div className="my-account-nav-tabs">
                <NavLink to="datos">
                    <div className="tab">
                        <h2>Mis datos</h2>
                    </div>
                </NavLink>
                <NavLink to="anuncios">
                    <div className="tab">
                        <h2>Mis anuncios</h2>
                    </div>
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
}

export default MyAccountPage;