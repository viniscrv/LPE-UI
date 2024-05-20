import { Lock, Pen, User } from "@phosphor-icons/react";
import { ProfileForm } from "./Dashboard/components/ProfileForm";
import { useState } from "react";
import { SecurityForm } from "./Dashboard/components/SecurityForm";

export function Profile() {
    const [formPage, setFormPage] = useState<"profile" | "security">("profile");

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-4 gap-6">
                <div className="col-span-3 grid w-full grid-cols-3 gap-3 rounded-md bg-neutral-900 pb-3 pl-3 pt-3">
                    <div className="col-span-2 flex flex-col p-4">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <img
                                    className="h-32 w-32 rounded-full border-2 border-blue-400"
                                    src="https://github.com/viniscrv.png"
                                />
                                <h2 className="ml-6 text-3xl font-bold">
                                    Viniscrv
                                </h2>
                            </div>

                            <button className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400">
                                <Pen size={18} />
                            </button>
                        </div>

                        {formPage == "profile" && <ProfileForm />}
                        {formPage == "security" && <SecurityForm />}

                    </div>

                    <nav className="flex flex-col  gap-2 border border-transparent border-l-neutral-700 p-2">
                        <button
                            onClick={() => setFormPage("profile")}
                            className="delay-50 flex h-8 w-full items-center justify-center gap-2 rounded-md bg-neutral-800 py-2 transition hover:bg-neutral-700"
                        >
                            <User />
                            Perfil
                        </button>
                        <button
                            onClick={() => setFormPage("security")}
                            className="delay-50 flex h-8 w-full items-center justify-center gap-2 rounded-md bg-neutral-800 py-2 transition hover:bg-neutral-700"
                        >
                            <Lock />
                            Segurança
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
