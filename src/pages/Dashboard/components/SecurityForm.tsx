import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../lib/axios";
import { AxiosError } from "axios";

interface SecurityFormProps {
    editMode: boolean;
    onSubmitForm: () => void;
}

const updatePasswordFormSchema = z.object({
    password: z
        .string()
        .min(6, { message: "Sua senha deve conter ao menos 6 caracteres" }),
    passwordConfirmation: z.string()
});

type updatePasswordFormData = z.infer<typeof updatePasswordFormSchema>;

export function SecurityForm({ editMode, onSubmitForm }: SecurityFormProps) {
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<updatePasswordFormData>({
        resolver: zodResolver(updatePasswordFormSchema)
    });

    function submitUpdatePassword({
        password,
        passwordConfirmation
    }: updatePasswordFormData) {
        if (password !== passwordConfirmation) {
            setPasswordsDoNotMatch(true);
            return;
        }

        setPasswordsDoNotMatch(false);
        handleUpdatePassword(password);
    }

    async function handleUpdatePassword(password: string) {
        try {
            await api.patch("/profile/edit_password/", {
                password
            });

            reset();
            onSubmitForm();
            alert("senha atualizada: TODO: toast");
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit(submitUpdatePassword)}
            className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3"
        >
            <div className="flex flex-col">
                <label>Senha</label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1 disabled:cursor-not-allowed disabled:text-neutral-400"
                    disabled={!editMode}
                    type="password"
                    placeholder="Sua nova senha"
                    {...register("password")}
                />

                {errors.password && (
                    <span className="mt-1 w-full text-sm text-red-500">
                        {errors.password.message}
                    </span>
                )}
            </div>

            <div className="flex flex-col">
                <label>Confirmação de senha</label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1 disabled:cursor-not-allowed disabled:text-neutral-400"
                    disabled={!editMode}
                    type="password"
                    placeholder="Confirmação da nova senha"
                    {...register("passwordConfirmation")}
                />
                {passwordsDoNotMatch && (
                    <span className="mt-1 w-full text-sm text-red-500">
                        Confirmação não corresponde a primeira senha
                    </span>
                )}
            </div>

            <button
                disabled={!editMode}
                className="col-span-2 mt-4 h-10 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400 
                disabled:cursor-not-allowed disabled:bg-neutral-700"
            >
                Salvar
            </button>
        </form>
    );
}
