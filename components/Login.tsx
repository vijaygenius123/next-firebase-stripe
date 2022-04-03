import React, {ReactElement, useEffect} from "react";
import {auth, firestore} from '../firebase/firebaseClient'
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, doc, setDoc} from "@firebase/firestore";

interface Props {

}

export default function Login({}: Props): ReactElement {
    const [signInWithGoogle, userData, userLoading, userError] = useSignInWithGoogle(auth);
    const [value, loading, error] = useCollection(
        collection(firestore, "users")
    )
    useEffect(() => {
        if (userData) {
            const userDocRef = doc(firestore, userData.user.uid, "users")
            setDoc(userDocRef, {
                uid: userData.user.uid,
                email: userData.user.email,
                name: userData.user.displayName,
                provider: userData.user.providerData[0].providerId,
                photoUrl: userData.user.photoURL
            }, {merge: true})

        }

    }, [userData])

    return (
        <>
            <button onClick={() => signInWithGoogle()}>Sign In With Google</button>
        </>
    )
}
