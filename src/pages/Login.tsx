import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { api } from "../lib/axios";
import { AxiosError } from "axios";

const loginFormSchema = z.object({
    username: z.string(),
    password: z.string()
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function Login() {
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema)
    });

    const navigate = useNavigate();

    function submitLogin(data: LoginFormData) {
        setLoading(true);
        handleLogin(data.username, data.password);
    }

    async function handleLogin(username: string, password: string) {
        try {
            const { data } = await api.post("/login/", {
                username,
                password
            });

            localStorage.setItem("token", JSON.stringify(data.token));
            api.defaults.headers.Authorization = `Bearer ${data.token}`;
            
            navigate("/home");
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                setInvalidCredentials(true);
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
                    className="bg-neutral-900 min-w-96 border-blue-400 border rounded-md flex flex-col items-center py-8 px-6"
                    onSubmit={handleSubmit(submitLogin)}
                >   
                    {invalidCredentials && (
                        <p className="w-full text-sm text-red-500 mb-2">Nome de usuário ou senha inválidos</p>
                    )}

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
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || loading}
                        className="w-full bg-blue-500 hover:bg-blue-400 py-2 px-4 mt-4 rounded-md text-neutral-50"
                    >
                        Log In
                    </button>
                </form>

                <p className="pt-2">
                    Ainda não tem uma conta?{" "}
                    <NavLink to={"/register"} className="text-neutral-50">
                        Registre-se
                    </NavLink>
                </p>
            </div>
        </>
    );
}
