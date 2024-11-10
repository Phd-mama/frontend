import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.FC, allowedRoles: string[]) => {
    const AuthComponent: React.FC = (props) => {
        const [loading, setLoading] = useState(true); 
        const router = useRouter();
        const role = typeof window !== 'undefined' ? localStorage.getItem("role") : null;

        useEffect(() => {
            if (!role || !allowedRoles.includes(role)) {
                router.push("/unauthorized");
            } else {
                setLoading(false); // matiin loading kalo role udah divalidasi
            }
        }, [role, router]);

        if (loading) {
            return (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-500 border-8 h-16 w-16"></div>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;
