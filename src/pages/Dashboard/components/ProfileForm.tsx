import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../lib/axios";
import { AxiosError } from "axios";
import { useContext } from "react";
import { ToastContext } from "../../../contexts/ToastContext";

interface ProfileFormProps {
    profileData: {
        id: number;
        user: number;
        first_name: string;
        last_name: string;
        email: string;
        username: string;
        biography: string;
    };
    editMode: boolean;
    onSubmitForm: () => void;
}

const profileFormSchema = z.object({
    firstName: z.string().min(1, { message: "Campo obrigatório" }),
    lastName: z.string().min(1, { message: "Campo obrigatório" }),
    username: z.string().min(1, { message: "Campo obrigatório" }),
    email: z.string().min(1, { message: "Campo obrigatório" }),
    biography: z.string().min(1, { message: "Campo obrigatório" })
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

export function ProfileForm({ profileData, editMode, onSubmitForm }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: profileData.first_name,
            lastName: profileData.last_name,
            username: profileData.username,
            email: profileData.email,
            biography: profileData.biography,
        }
    });

    const { shootToast } = useContext(ToastContext);

    async function submitProfile(data: ProfileFormData) {
        try {
            console.log("username", data.username)
            await api.patch("/profile/edit/", {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                username: data.username,
                biography: data.biography
            });

            shootToast({
                color: "blue",
                title: `Você editou seu perfil`,
                description: "",
            });

            onSubmitForm();
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }

            shootToast({
                color: "red",
                title: `Tente novamente`,
                description: "Falha ao atualizar as informações",
            });
        }
    }

    return (
        <form
            className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3"
            onSubmit={handleSubmit(submitProfile)}
        >
            <div className="flex flex-col">
                <label>Primeiro nome</label>
                <input
                    className="mt-1 rounded-md bg-transparent p-1 disabled:cursor-not-allowed disabled:text-neutral-400"
                    disabled={!editMode}
                    type="text"
                    {...register("firstName")}
                />

                {errors.firstName && (
                    <span className="mt-1 w-full text-sm text-red-500">
                        {errors.firstName.message}
                    </span>
                )}
            </div>
            <div className="flex flex-col">
                <label>Segundo nome</label>
                <input
                    className="mt-1 rounded-md bg-transparent p-1 disabled:cursor-not-allowed disabled:text-neutral-400"
                    disabled={!editMode}
                    type="text"
                    {...register("lastName")}
                />

                {errors.lastName && (
                    <span className="mt-1 w-full text-sm text-red-500">
                        {errors.lastName.message}
                    </span>
                )}
            </div>
            <div className="flex flex-col">
                <label>Nome de usuário</label>
                <input
                    className="mt-1 rounded-md bg-transparent p-1 disabled:cursor-not-allowed disabled:text-neutral-400"
                    disabled={!editMode}
                    // disabled={true}
                    type="text"
                    {...register("username")}
                />

                {errors.username && (
                    <span className="mt-1 w-full text-sm text-red-500">
                        {errors.username.message}
                    </span>
                )}
            </div>
            <div className="flex flex-col">
                <label>E-mail</label>
                <input
                    className="mt-1 rounded-md bg-transparent p-1 disabled:cursor-not-allowed disabled:text-neutral-400"
                    disabled={!editMode}
                    type="text"
                    {...register("email")}
                />

                {errors.email && (
                    <span className="mt-1 w-full text-sm text-red-500">
                        {errors.email.message}
                    </span>
                )}
            </div>
            <div className="col-span-2 flex flex-col">
                <label>Biografia</label>
                <textarea
                    className=" mt-1 h-24 rounded-md bg-transparent p-1 disabled:cursor-not-allowed disabled:text-neutral-400"
                    disabled={!editMode}
                    {...register("biography")}
                />

                {errors.biography && (
                    <span className="mt-1 w-full text-sm text-red-500">
                        {errors.biography.message}
                    </span>
                )}
            </div>

            <button disabled={!editMode} className="col-span-2 mt-4 h-10 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400 
                disabled:cursor-not-allowed disabled:bg-neutral-700">
                Salvar
            </button>
        </form>
    );
}
