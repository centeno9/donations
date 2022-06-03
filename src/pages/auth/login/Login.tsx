import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { db } from "../../../config/firebase";



function LoginPage() {
    const auth = getAuth();
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
                        navigate('/mi-cuenta');
                    });
                }

            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            })
    }
    return (
        <button onClick={() => signInWithGoogle()} disabled={authing}>Sign in with google</button>
    );
}

export default LoginPage;