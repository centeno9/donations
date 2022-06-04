import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import "./LoginStyles.scss";
import { useAuth } from '../../../Context/UserContext';


function LoginPage() {

    const auth = getAuth();
    let user = useAuth().user;
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const [authing, setAuthing] = useState<boolean>(false);

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then(async response => {

                const user = response.user;

                const userRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    console.log("ya existia");
                    navigate('/mi-cuenta');
                } else {
                    // doc.data() will be undefined in this case
                    const docRef = await setDoc(doc(db, "users", response.user.uid), {
                        name: response.user.displayName,
                        email: response.user.email,
                        phone: response.user.phoneNumber,
                        profilePic: response.user.photoURL,
                        remainingAds: 1
                    }).then(() => {
                        navigate('/mi-cuenta/datos');
                    });
                }

            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            })
    }

    useEffect(() => {
        if (user !== null) {
            navigate('/mi-cuenta/datos')

        }
    }, [user])

    const onSubmit = (e: any) => {

        e.preventDefault();

        if(email === "" || password === "") {
            alert("Favor de llenar todos los campos")
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Algun dato es incorrecto")
            });
    }

    return (
        <div className='login-main-container'>
            <div className='login-card'>
                <div className='title'>
                    <h2>Iniciar sesión</h2>
                </div>
                <form onSubmit={onSubmit} className='inputs-container'>
                    <div className='input-row'>
                        <h3>Correo:</h3>
                        <div className='input-styled'>
                            <input type="email" name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className='input-row'>
                        <h3>Contraseña:</h3>
                        <div className='input-styled'>
                            <input type="password" name='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='input-row'>
                        <button className='login-btn' type='submit'>Iniciar sesión</button>
                    </div>
                    <div className='input-row'>
                        <h3 className='no-acccount'>¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link></h3>
                    </div>
                </form>
                <button className='login-google-btn' onClick={() => signInWithGoogle()} disabled={authing}>Iniciar sesión con google</button>
            </div>
        </div>
    );
}

export default LoginPage;