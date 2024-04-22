import { ChartBar } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

export function Home() {
    const pages = ["dashboard-01", "dashboard-02", "dashboard-03"];

    return (
        <div className="flex">
            <nav className="min-h-screen w-44 bg-neutral-900">
                <h2 className="w-full py-8 text-center text-xl font-bold">
                    Nome bom
                </h2>

                <ul className="flex flex-col gap-2">
                    {pages.map((page) => {
                        return (
                            <li key={page}>
                                <NavLink
                                    to={"/home"}
                                    className={
                                        "flex items-center justify-center gap-2"
                                    }
                                >
                                    <ChartBar
                                        size={18}
                                        color="#8B8B8B"
                                    ></ChartBar>
                                    <span className="text-neutral-400">
                                        {page}
                                    </span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <header className="flex h-20 w-full items-center justify-end border-l border-neutral-950 bg-neutral-900 px-8">
                <div className="flex items-center gap-3">
                    <span className="w-full py-8 text-center text-xl font-bold">Viniscrv</span>
                    <img className="h-14 w-14 rounded-full border-2 border-blue-400" src="https://github.com/viniscrv.png" />
                </div>
            </header>
        </div>
    );
}
