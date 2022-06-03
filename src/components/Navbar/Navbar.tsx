import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/UserContext";
import './Styles.scss';


function Navbar() {

    let user = useAuth().user;
    const signout = useAuth().logout;

    console.log(user)

    const auth = getAuth();

    console.log(auth);

    const logOut = () => {
        signout();
    }

    return (
        <nav>
            <Link to="/inicio">Inicio</Link>
            {user === null ? (
                <Link className="my-account-btn" to="/login">Iniciar sesión</Link>
            ) : (
                <Link className="my-account-btn" to={'/mi-cuenta/datos'}>Mi cuenta</Link>
            )}
        </nav>
    );
}

export default Navbar;