import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { db } from "../../../config/firebase";
import "./Register.scss";


function Register() {
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [email2, setEmail2] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const auth = getAuth();
    const navigate = useNavigate();

    const onSubmit = (e:any) => {
        e.preventDefault();
        if(email === "" || email2 === "" || name === "" || phone === "" || password === "" || password2 === "") {
            alert("Favor de llenar todos los campos");
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const docRef = await setDoc(doc(db, "users", user.uid), {
                        name: name,
                        email: email,
                        phone: phone,
                        profilePic: "",
                        remainingAds: 1
                    }).then(() => {
                        navigate('/mi-cuenta');
                    });
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    alert(errorMessage);
                    // ..
                });
        }

    }

    return (
        <div className='login-main-container'>
            <div className='login-card'>
                <div className='title'>
                    <h2>Registrate</h2>
                </div>
                <form onSubmit={onSubmit} className='inputs-container'>
                    <div className='input-row'>
                        <h3>Nombre:</h3>
                        <div className='input-styled'>
                            <input type="text" name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className='input-row'>
                        <h3>Celular:</h3>
                        <div className='input-styled'>
                            <input type="text" name='phone' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div className='input-row'>
                        <h3>Correo:</h3>
                        <div className='input-styled'>
                            <input type="email" name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className='input-row'>
                        <h3>Confirmar correo:</h3>
                        <div className='input-styled'>
                            <input type="email" name='email2' id='email2' value={email2} onChange={(e) => setEmail2(e.target.value)} />
                        </div>
                    </div>
                    <div className='input-row'>
                        <h3>Contraseña:</h3>
                        <div className='input-styled'>
                            <input type="password" name='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='input-row'>
                        <h3>Confirmar contraseña:</h3>
                        <div className='input-styled'>
                            <input type="password" name='password2' id='password2' value={password2} onChange={(e) => setPassword2(e.target.value)} />
                        </div>
                    </div>
                    <div className='input-row'>
                        <button className='login-btn' type='submit'>Registrarme</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;