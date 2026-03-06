'use client'
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthGuard = ({children}:{children:React.ReactNode}) => {
    const router = useRouter();
    const {routeSignupPage, setRouteSignupPage} = useAuthStore((state) => state);
    useEffect(() => {
        if(routeSignupPage) {
            router.push('/signup')
            setRouteSignupPage(false)
        }

    }, [routeSignupPage, router, setRouteSignupPage])
    
    return <>{children}</>
}
export default AuthGuard;