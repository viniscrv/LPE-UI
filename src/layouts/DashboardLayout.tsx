import { CalendarCheck, ChartBar } from "@phosphor-icons/react";
import { NavLink, Outlet } from "react-router-dom";

export function DashboardLayout() {
    const pages = ["Today", "dashboard-02", "dashboard-03"];

    return (
        <>
            <div className="relative min-h-screen w-full">
                <header className="flex h-20 w-full items-center justify-end bg-neutral-900 px-8">
                    <div className="flex items-center gap-3">
                        <span className="w-full py-8 text-center text-xl font-bold">
                            Viniscrv
                        </span>
                        <img
                            className="h-14 w-14 rounded-full border-2 border-blue-400"
                            src="https://github.com/viniscrv.png"
                        />
                    </div>
                </header>
                <nav className="absolute left-0 top-0 min-h-screen w-44 border-r border-neutral-950 bg-neutral-900">
                    <h2 className="w-full py-8 text-center text-xl font-bold">
                        Nome bom
                    </h2>

                    <ul className="flex flex-col gap-2 items-start">
                        {pages.map((page) => {
                            return (
                                <li key={page}>
                                    <NavLink
                                        to={"/dashboard/today"}
                                        className={
                                            "flex items-center justify-center gap-2 pl-6"
                                        }
                                    >
                                        <CalendarCheck
                                            size={18}
                                            color="#8B8B8B"
                                        ></CalendarCheck>
                                        <span className="text-neutral-400">
                                            {page}
                                        </span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="ml-48 mr-4 mt-4">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
}
