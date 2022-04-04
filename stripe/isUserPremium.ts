import {auth} from '../firebase/firebaseClient'

export default async function isUserPremium(): Promise<boolean> {
    const {currentUser} = auth;
    await currentUser.getIdToken(true)
    const decodedToken = await currentUser.getIdTokenResult()
    return !!decodedToken.claims.stripeRole
}
