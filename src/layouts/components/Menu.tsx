// import {
//     CalendarCheck,
//     ChartLineUp,
//     ClockCounterClockwise,
//     ListBullets,
//     SignOut,
//     User
// } from "@phosphor-icons/react";
// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// export function Menu() {

//     const [menuIsOpen, setMenuIsOpen] = useState(false);

//     const pages = [
//         {
//             name: "Meu Perfil",
//             icon: (
//                 <User
//                     size={18}
//                     color="#8B8B8B"
//                     className="group-hover:fill-neutral-100 group-[&.active]:fill-neutral-100"
//                 />
//             ),
//             path: "/dashboard/me"
//         },
//         {
//             name: "Hoje",
//             icon: (
//                 <CalendarCheck
//                     size={18}
//                     color="#8B8B8B"
//                     className="group-hover:fill-neutral-100 group-[&.active]:fill-neutral-100"
//                 />
//             ),
//             path: "/dashboard/today"
//         },
//         {
//             name: "Histórico",
//             icon: (
//                 <ClockCounterClockwise
//                     size={18}
//                     color="#8B8B8B"
//                     className="group-hover:fill-neutral-100 group-[&.active]:fill-neutral-100"
//                 />
//             ),
//             path: "/dashboard/history"
//         },
//         {
//             name: "Atividades",
//             icon: (
//                 <ListBullets
//                     size={18}
//                     color="#8B8B8B"
//                     className="group-hover:fill-neutral-100 group-[&.active]:fill-neutral-100"
//                 />
//             ),
//             path: "/dashboard/activity-manager"
//         },
//         {
//             name: "Estatísticas",
//             icon: (
//                 <ChartLineUp
//                     size={18}
//                     color="#8B8B8B"
//                     className="group-hover:fill-neutral-100 group-[&.active]:fill-neutral-100"
//                 />
//             ),
//             path: "/dashboard/statistics"
//         }
//     ];

//     const navigate = useNavigate();

//     function handleLogout() {
//         localStorage.removeItem("token");
//         navigate("/");
//     }

//     return (
//         <div className="absolute left-0 top-0 z-10 min-h-screen w-44 border-r border-neutral-950 bg-neutral-900 md:block">
//             <h2 className="w-full py-8 text-center text-xl font-bold">LPE</h2>

//             <ul className="flex flex-col items-start gap-2">
//                 {pages.map((page, index) => {
//                     return (
//                         <li key={index}>
//                             <NavLink
//                                 to={page.path}
//                                 className={
//                                     "group flex items-center justify-center gap-2 pl-6"
//                                 }
//                             >
//                                 {page.icon}
//                                 <span className="text-neutral-400 group-hover:text-neutral-100 group-[&.active]:text-neutral-100">
//                                     {page.name}
//                                 </span>
//                             </NavLink>
//                         </li>
//                     );
//                 })}
//             </ul>

//             <div className="absolute bottom-12 w-full text-red-500">
//                 <span
//                     onClick={handleLogout}
//                     className="m-auto flex w-min cursor-pointer select-none items-center gap-1 text-lg"
//                 >
//                     Sair
//                     <SignOut size={18} />
//                 </span>
//             </div>
//         </div>
//     );
// }
