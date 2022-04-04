import {collection, addDoc, doc, onSnapshot} from "@firebase/firestore";
import {firestore} from "../firebase/firebaseClient";


export async function createCheckoutSession(uid: string) {


    const docRef = doc(firestore, "users", uid);
    const colRef = await collection(docRef, "checkout_sessions")
    const checkoutRef = await addDoc(colRef, {
        price: "price_1KkYE3SF9BG4qwAf74uOjx8J",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    });

    onSnapshot(checkoutRef, (snap) => {
        const {error, url} = snap.data();
        if (error) {
            alert(`An error occured: ${error.message}`);
        }
        if (url) {
            window.location.assign(url);
        }
    })
}
