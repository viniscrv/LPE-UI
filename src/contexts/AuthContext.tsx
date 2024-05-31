import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/axios";

interface AuthContextType {
    authenticated: boolean;
    toggleAuthenticatedState: (value: boolean) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);

            navigate("/dashboard/today");
        } else {

            navigate("/");
        }

        setLoading(false);
    }, []);

    function toggleAuthenticatedState(value: boolean) {
        setAuthenticated(value);
    }

    if (loading) {
        return <h1>loading...</h1>;
    }

    return (
        <AuthContext.Provider
            value={{ authenticated, toggleAuthenticatedState }}
        >
            {children}
        </AuthContext.Provider>
    );
}
