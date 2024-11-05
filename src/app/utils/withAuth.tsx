"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";  

const withAuth = (WrappedComponent: React.FC, allowedRoles: string[]) => {
    const AuthComponent: React.FC = (props) => {
        const router = useRouter();
        const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

        useEffect(() => {
            if (typeof window !== "undefined" && (!role || !allowedRoles.includes(role))) {
                router.push("/unauthorized");  
            }
        }, [role, router]);

        return role && allowedRoles.includes(role) ? <WrappedComponent {...props} /> : null;
    };

    return AuthComponent;
};

export default withAuth;
