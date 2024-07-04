import { createContext, ReactNode, useState } from "react";

interface DashboardProviderProps {
    children: ReactNode;
}
    
interface DashboardContextType {
    dashboardPageTitle: string;
    setDashboardPageTitle: (text: string) => void;
}

export const DashboardContext = createContext({} as DashboardContextType);

export function DashboardProvider({ children }: DashboardProviderProps) {
    const [dashboardPageTitle, setDashboardPageTitle] = useState("");


    return (
        <DashboardContext.Provider value={{ dashboardPageTitle, setDashboardPageTitle }}>
            {children}
        </DashboardContext.Provider>
    );
};
