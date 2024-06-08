import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { api } from "../lib/axios";
import { AxiosError } from "axios";

const registerFormSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Seu username deve conter ao menos 3 caracteres" }),
    biography: z
        .string()
        .min(3, "Sua biografia deve conter ao menos 3 caracteres"),
    password: z
        .string()
        .min(6, { message: "Sua senha deve conter ao menos 6 caracteres" }),
    passwordConfirmation: z.string()
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export function Register() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema)
    });

    function submitRegister({
        username,
        biography,
        password,
        passwordConfirmation
    }: RegisterFormData) {
        if (password !== passwordConfirmation) {
            setPasswordsDoNotMatch(true);
            return;
        }

        setPasswordsDoNotMatch(false);

        setLoading(true);
        handleRegister(username, biography, password);
    }

    async function handleRegister(
        username: string,
        biography: string,
        password: string
    ) {
        try {
            await api.post("/register/", {
                username,
                biography,
                password
            });

            alert("Conta criada com sucesso!");
            navigate("/");
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex min-h-screen w-full flex-col items-center justify-center">
                <form
                    onSubmit={handleSubmit(submitRegister)}
                    className="flex min-w-96 flex-col items-center rounded-md border border-blue-400 bg-neutral-900 px-6 py-8"
                >
                    <div className="flex w-full flex-col">
                        <label htmlFor="username" className="text-sm">
                            Nome de úsuario
                        </label>
                        <input
                            id="username"
                            type="text"
                            {...register("username")}
                            className="mt-1 rounded-md bg-transparent p-1"
                        />

                        {errors.username && (
                            <span className="mt-1 w-full text-sm text-red-500">
                                {errors.username.message}
                            </span>
                        )}
                    </div>
                    <div className="mt-2 flex w-full flex-col">
                        <label htmlFor="password" className="text-sm">
                            Biografia
                        </label>
                        <textarea
                            id="password"
                            {...register("biography")}
                            className="mt-1 rounded-md bg-transparent p-1"
                        />

                        {errors.biography && (
                            <span className="mt-1 w-full text-sm text-red-500">
                                {errors.biography.message}
                            </span>
                        )}
                    </div>
                    <div className="mt-2 flex w-full flex-col">
                        <label htmlFor="password" className="text-sm">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password")}
                            className="mt-1 rounded-md bg-transparent p-1"
                        />

                        {errors.password && (
                            <span className="mt-1 w-full text-sm text-red-500">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className="mt-2 flex w-full flex-col">
                        <label
                            htmlFor="passwordConfirmation"
                            className="text-sm"
                        >
                            Confirmação da senha
                        </label>
                        <input
                            id="passwordConfirmation"
                            type="password"
                            {...register("passwordConfirmation")}
                            className="mt-1 rounded-md bg-transparent p-1"
                        />
                        {passwordsDoNotMatch && (
                            <span className="mt-1 w-full text-sm text-red-500">
                                Senhas não coincidem
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || loading}
                        className="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-neutral-50 hover:bg-blue-400"
                    >
                        Registrar-se
                    </button>
                </form>

                <p className="pt-2">
                    <NavLink to={"/"} className="text-neutral-50">
                        Voltar para o Log In
                    </NavLink>
                </p>
            </div>
        </>
    );
}
