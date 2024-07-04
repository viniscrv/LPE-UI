import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Today } from "./pages/Dashboard/Today";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ActivityManager } from "./pages/Dashboard/ActivityManager";
import { Statistics } from "./pages/Dashboard/Statistics";
import { Profile } from "./pages/Dashboard/Profile";
import { History } from "./pages/Dashboard/History";
import { DashboardProvider } from "./contexts/DashboardContext";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />}/>

            <Route path="/dashboard" element={
                <DashboardProvider>
                    <DashboardLayout />
                </DashboardProvider>
            }>
                <Route path="/dashboard/me" element={<Profile />}/>
                <Route path="/dashboard/today" element={<Today />}/>
                <Route path="/dashboard/history" element={<History />}/>
                <Route path="/dashboard/activity-manager" element={<ActivityManager />}/>
                <Route path="/dashboard/statistics" element={<Statistics />}/>
            </Route>
        </Routes>
    )
}