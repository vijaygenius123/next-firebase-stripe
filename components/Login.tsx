import React, {ReactElement} from "react";
import {auth, firestore} from '../firebase/firebaseClient'
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {doc, setDoc} from "@firebase/firestore";


interface Props {

}

const provider = new GoogleAuthProvider();

export default function Login({}: Props): ReactElement {

    async function handleGoogleSignIn() {
        const userData = await signInWithPopup(auth, provider)
        const userDocRef = await doc(firestore, "users", userData.user.uid)
        setDoc(userDocRef, {
            uid: userData.user.uid,
            email: userData.user.email,
            name: userData.user.displayName,
            provider: userData.user.providerData[0].providerId,
            photoUrl: userData.user.photoURL
        }, {merge: true}).then(console.log)

    }

    return (
        <>
            <button onClick={() => handleGoogleSignIn()}>Sign In With Google</button>
        </>
    )
}
