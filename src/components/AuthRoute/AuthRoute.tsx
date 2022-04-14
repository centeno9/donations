import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IAuthRouteProps { children: any };

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {

    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const authCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                setLoading(false);
            } else {
                console.log('no auth');
                navigate('/login');
            }
        })
        return () => authCheck();
    }, [auth]);




    if (loading) return <p>Loading ...</p>;

    return (
        <>{children}</>
    );
}

export default AuthRoute;