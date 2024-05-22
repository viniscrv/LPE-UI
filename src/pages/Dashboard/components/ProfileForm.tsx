import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../lib/axios";
import { AxiosError } from "axios";

interface ProfileFormProps {
    profileData: {
        id: Number;
        user: Number;
        username: string;
        biography: string;
    };
}

const profileFormSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    username: z.string().min(1),
    email: z.string().min(1),
    biography: z.string().min(1)
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

export function ProfileForm({ profileData }: ProfileFormProps) {
    const { register, handleSubmit } = useForm<ProfileFormData>({
        resolver: zodResolver(profileFormSchema)
    });

    async function submitProfile(data: ProfileFormData) {
        try {
            await api.patch("/profile/edit/", {
                username: data.username,
                biography: data.biography
            });
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
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
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="text"
                    {...register("firstName")}
                    defaultValue={profileData.username}
                />
            </div>
            <div className="flex flex-col">
                <label>Segundo nome</label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="text"
                    {...register("lastName")}
                    defaultValue={profileData.username}
                />
            </div>
            <div className="flex flex-col">
                <label>Nome de usuário</label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="text"
                    {...register("username")}
                    defaultValue={profileData.username}
                />
            </div>
            <div className="flex flex-col">
                <label>E-mail</label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="text"
                    {...register("email")}
                    defaultValue={profileData.username}
                />
            </div>
            <div className="col-span-2 flex flex-col">
                <label>Biografia</label>
                <textarea
                    className=" mt-1 h-24 rounded-md border border-neutral-500 bg-transparent p-1"
                    {...register("biography")}
                    defaultValue={profileData.biography}
                />
            </div>

            <button
                className="col-span-2 mt-4 h-10 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400"
            >
                Salvar
            </button>
        </form>
    );
}
