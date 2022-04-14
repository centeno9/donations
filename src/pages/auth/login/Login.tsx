import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState<boolean>(false);

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                console.log(response);
                navigate('/mi-cuenta');
            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            })
    }
    return (
        <button onClick={() => signInWithGoogle()}  disabled={authing}>Sign in with google</button>
    );
}

export default LoginPage;