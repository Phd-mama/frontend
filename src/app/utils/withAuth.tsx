import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.FC, allowedRoles: string[]) => {
    const AuthComponent: React.FC = (props) => {
        const [hasMounted, setHasMounted] = useState(false);
        const router = useRouter();
        const role = typeof window !== 'undefined' ? localStorage.getItem("role") : null;

        useEffect(() => {
            setHasMounted(true); 

            // Redirect kalo user gapunya akses
            if (hasMounted && (!role || !allowedRoles.includes(role))) {
                router.push("/unauthorized");
            }
        }, [hasMounted, role, router]);

        // kalo belom mounted, jangan render apa-apa
        if (!hasMounted) return null;

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;
