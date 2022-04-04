import {useState, useEffect} from "react";
import isUserPremium from "./isUserPremium";
import {User} from "@firebase/auth";

export default function usePremiumStatus(user: User) {
    const [premium, setPremium] = useState<boolean>(false)

    useEffect(() => {
        if (user) {
            const checkPremiumStatus = async function () {
                setPremium(await isUserPremium())
            }
            checkPremiumStatus()
        }

    }, [user])

    return premium
}
