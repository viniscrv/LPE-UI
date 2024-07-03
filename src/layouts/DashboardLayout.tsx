import {
    CalendarCheck,
    ChartLineUp,
    ClockCounterClockwise,
    ListBullets,
    SignOut,
    User
} from "@phosphor-icons/react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { GenericToast } from "../components/GenericToast";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { api } from "../lib/axios";

interface ProfileData {
    id: number;
    user: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    biography: string;
}

export function DashboardLayout() {
    const [profileData, setProfileData] = useState<ProfileData | null>();

    const pages = [
        {
            name: "Meu Perfil",
            icon: <User size={18} color="#8B8B8B" className="group-hover:fill-neutral-100 group-[&.active]:fill-neutral-100" />,
            path: "/dashboard/me"
        },
        {
            name: "Hoje",
            icon: <CalendarCheck size={18} color="#8B8B8B" className="group-hover:fill-neutral-100 group-[&.active]:fill-neutral-100" />,
            path: "/dashboard/today"
        },
        {
            name: "Histórico",
            icon: <ClockCounterClockwise size={18} color="#8B8B8B" className="group-hover:fill-neutral-100 group-[&.active]:fill-neutral-100" />,
            path: "/dashboard/history"
        },
        {
            name: "Atividades",
            icon: <ListBullets size={18} color="#8B8B8B" className="group-hover:fill-neutral-100 group-[&.active]:fill-neutral-100" />,
            path: "/dashboard/activity-manager"
        },
        {
            name: "Estatísticas",
            icon: <ChartLineUp size={18} color="#8B8B8B" className="group-hover:fill-neutral-100 group-[&.active]:fill-neutral-100"/>,
            path: "/dashboard/statistics"
        }
    ];

    const navigate = useNavigate();

    useEffect(() => {
        getProfileInfo();
    }, []);

    async function getProfileInfo() {
        try {
            const { data } = await api.get("/me/");

            setProfileData(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }


    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <>
            <div className="relative min-h-screen w-full">
                <header className="flex h-20 w-full items-center justify-end bg-neutral-900 px-8">
                    <div className="flex items-center gap-3">
                        <span className="w-full py-8 text-center text-xl font-bold">
                            {profileData?.username}
                        </span>
                        <img
                            className="h-14 w-14 rounded-full border-2 border-blue-400"
                            src="https://github.com/vini9457128.png"
                        />
                    </div>
                </header>
                <nav className="absolute left-0 top-0 min-h-screen w-44 border-r border-neutral-950 bg-neutral-900">
                    <h2 className="w-full py-8 text-center text-xl font-bold">
                        Nome bom
                    </h2>

                    <ul className="flex flex-col items-start gap-2">
                        {pages.map((page, index) => {
                            return (
                                <li key={index}>
                                    <NavLink
                                        to={page.path}
                                        className={
                                            "flex items-center justify-center gap-2 pl-6 group"
                                        }
                                    >
                                        {page.icon}
                                        <span className="text-neutral-400 group-hover:text-neutral-100 group-[&.active]:text-neutral-100">
                                            {page.name}
                                        </span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="absolute bottom-12 w-full text-red-500">
                        <span onClick={handleLogout} className="m-auto flex w-min cursor-pointer select-none items-center gap-1 text-lg">
                            Sair
                            <SignOut size={18} />
                        </span>
                    </div>
                </nav>
                <div className="ml-48 mr-4 mt-4 h-[calc(100vh-5rem-1rem)]">
                    <Outlet></Outlet>
                </div>
                <GenericToast />
            </div>
        </>
    );
}
