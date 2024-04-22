import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Dashboard/Home";
import { DashboardLayout } from "./layouts/DashboardLayout";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />}/>

            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Home />}/>
            </Route>
        </Routes>
    )
}