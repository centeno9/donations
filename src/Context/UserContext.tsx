import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";


const AuthContext = createContext<any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const auth = getAuth();


  const logout = () => {

    return signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.log(error)
    })
  };


	useEffect(() => {
		return onAuthStateChanged(auth, async (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				const docRef = doc(db, "users", uid);
				const docSnap = await getDoc(docRef);
        const data = {
          id: uid,
          ...docSnap.data()
        }
				setUser(data);
        setIsAuthenticating(false);
				// ...
			} else {
				// User is signed out
				// ...
        setIsAuthenticating(false);
			}
		});
	}, [])

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //     console.log(user)
  //     setIsAuthenticating(false);
  //   });
  //   return () => unsubscribe();
  // }, []);

  const values = {
    user,
    isAuthenticating,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};
