import { ChartBar } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

export function Home() {
    const pages = ["dashboard-01", "dashboard-02", "dashboard-03"]

    return (
        <div className="flex">
            <nav className="w-44 min-h-screen bg-neutral-900">
                <h2 className="w-full text-center font-bold text-xl py-8">Nome bom</h2>

                <ul className="flex flex-col gap-2">
                    {pages.map((page) => {
                        return (
                            <li key={page}>
                                <NavLink to={"/home"} className={"flex items-center justify-center gap-2"}>
                                    <ChartBar size={18} color="#8B8B8B"></ChartBar>
                                    <span className="text-neutral-400">{page}</span>
                                </NavLink>
                            </li>
                        )
                    })}
                    
                </ul>
            </nav>
            <header>header</header>
        </div>
    )
}