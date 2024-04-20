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
            <div className="w-full min-h-screen flex flex-col justify-center items-center">
                <form
                    onSubmit={handleSubmit(submitRegister)}
                    className="bg-neutral-900 min-w-96 border-blue-400 border rounded-md flex flex-col items-center py-8 px-6"
                >
                    <div className="flex flex-col w-full">
                        <label htmlFor="username" className="text-sm">
                            Nome de úsuario
                        </label>
                        <input
                            id="username"
                            type="text"
                            {...register("username")}
                            className="border-neutral-500 border rounded-md bg-transparent p-1 mt-1"
                        />

                        {errors.username && (
                            <span className="w-full text-sm text-red-500 mt-1">
                                {errors.username.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col mt-2 w-full">
                        <label htmlFor="password" className="text-sm">
                            Biografia
                        </label>
                        <textarea
                            id="password"
                            {...register("biography")}
                            className="border-neutral-500 border rounded-md bg-transparent p-1 mt-1"
                        />

                        {errors.biography && (
                            <span className="w-full text-sm text-red-500 mt-1">
                                {errors.biography.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col mt-2 w-full">
                        <label htmlFor="password" className="text-sm">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password")}
                            className="border-neutral-500 border rounded-md bg-transparent p-1 mt-1"
                        />

                        {errors.password && (
                            <span className="w-full text-sm text-red-500 mt-1">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col mt-2 w-full">
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
                            className="border-neutral-500 border rounded-md bg-transparent p-1 mt-1"
                        />
                        {passwordsDoNotMatch && (
                            <span className="w-full text-sm text-red-500 mt-1">
                                Senhas não coincidem
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || loading}
                        className="w-full bg-blue-500 hover:bg-blue-400 py-2 px-4 mt-4 rounded-md text-neutral-50"
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
