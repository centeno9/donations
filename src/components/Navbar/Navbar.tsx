import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";


function Navbar() {

    const auth = getAuth();

	console.log(auth)

    return (
        <nav
            style={{
                borderBottom: "solid 1px",
                paddingBottom: "1rem",
            }}
        >
            <Link to="/inicio">Inicio</Link> |{" "}
            <Link to="/login">Iniciar sesión</Link>
            <button onClick={() => signOut(auth)} >Sign out</button>
        </nav>
    );
}

export default Navbar;