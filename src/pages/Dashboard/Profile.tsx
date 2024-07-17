import { Lock, Pen, User } from "@phosphor-icons/react";
import { ProfileForm } from "./components/ProfileForm";
import { useContext, useEffect, useState } from "react";
import { SecurityForm } from "./components/SecurityForm";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";
import { DashboardContext } from "../../contexts/DashboardContext";

export function Profile() {
    interface ProfileData {
        id: number;
        user: number;
        first_name: string;
        last_name: string;
        email: string;
        username: string;
        biography: string;
    }

    const [formPage, setFormPage] = useState<"profile" | "security">("profile");
    const [profileData, setProfileData] = useState<ProfileData | null>();
    const [editMode, setEditMode] = useState<boolean>(false);

    const { setDashboardPageTitle } = useContext(DashboardContext);

    useEffect(() => {
        getProfileInfo();
        setDashboardPageTitle("Configurações do perfil");
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

    function handleFormSumited() {
        toggleEditMode();
    }

    function toggleEditMode() {
        setEditMode((state) => !state);
    }

    return (
        <div className="flex flex-row gap-6 md:flex-col">
            <div className="flex flex-col gap-6 md:grid md:grid-cols-4">
                <div className="w-full grid-cols-3 gap-3 rounded-md bg-neutral-900 pb-3 pt-3 md:col-span-3 md:grid md:pl-3">
                    <div className="flex flex-col p-4 md:col-span-2">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <img
                                    className="h-32 w-32 rounded-full border-2 border-blue-400"
                                    src="https://github.com/vini9457128.png"
                                />
                                <h2 className="ml-6 text-3xl font-bold">
                                    {profileData?.username}
                                </h2>
                            </div>

                            <button
                                data-edit-mode={editMode}
                                onClick={() => toggleEditMode()}
                                className="
                                    flex h-10 w-10 items-center justify-center rounded-md bg-blue-500
                                    text-neutral-50 hover:bg-blue-400 data-[edit-mode='true']:bg-blue-400/50"
                            >
                                <Pen size={18} />
                            </button>
                        </div>

                        {formPage == "profile" && profileData && (
                            <ProfileForm
                                profileData={profileData}
                                editMode={editMode}
                                onSubmitForm={handleFormSumited}
                            />
                        )}
                        {formPage == "security" && (
                            <SecurityForm
                                editMode={editMode}
                                onSubmitForm={handleFormSumited}
                            />
                        )}
                    </div>

                    <nav className="flex flex-col gap-2 border border-transparent border-t-neutral-700 p-2 md:border-l-neutral-700 md:border-t-transparent">
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
