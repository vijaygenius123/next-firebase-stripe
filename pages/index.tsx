import styles from '../styles/Home.module.css'
import Login from "../components/Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "@firebase/auth";
import {auth} from "../firebase/firebaseClient";
import {createCheckoutSession} from "../stripe/createCheckoutSession";
import usePremiumStatus from "../stripe/usePremiumState";

export default function Home() {
    const [user, userLoading] = useAuthState(auth);
    const userIsPremium = usePremiumStatus(user);

    return (
        <div className={styles.container}>
            {!user && userLoading && <h1>Loading...</h1>}
            {!user && !userLoading && <Login/>}
            {user && !userLoading && (
                <div>
                    <h1>Hello, {user.displayName}</h1>
                    {!userIsPremium ? (
                        <button onClick={() => createCheckoutSession(user.uid)}>
                            Upgrade to premium!
                        </button>
                    ) : (
                        <h2>Have a cookie 🍪 Premium customer!</h2>
                    )}
                    <button onClick={() => {
                        signOut(auth)
                    }}>Logout
                    </button>
                </div>
            )}
        </div>
    )
}
