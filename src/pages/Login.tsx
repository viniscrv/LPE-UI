import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { api } from "../lib/axios";
import { AxiosError } from "axios";

const loginFormSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
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

            localStorage.setItem("token", JSON.stringify(data.access));
            api.defaults.headers.Authorization = `Bearer ${data.access}`;

            navigate("/dashboard/today");
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
            <div className="bg-register-login flex min-h-screen w-full flex-col items-center justify-center">
                <form
                    className="flex min-w-80 flex-col items-center rounded-md bg-neutral-900 px-6 py-8 md:min-w-96"
                    onSubmit={handleSubmit(submitLogin)}
                >
                    {invalidCredentials && (
                        <p className="mb-2 w-full text-sm text-red-500">
                            Nome de usuário ou senha inválidos
                        </p>
                    )}

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
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || loading}
                        className="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-neutral-50 hover:bg-blue-400"
                    >
                        Log In
                    </button>
                </form>

                <p className="pt-2">
                    Ainda não tem uma conta?{" "}
                    <NavLink
                        to={"/register"}
                        className="text-neutral-50 underline"
                    >
                        Registre-se
                    </NavLink>
                </p>

                <a
                    className="absolute bottom-2 text-sm md:right-2"
                    target="_blank"
                    href="https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/"
                >
                    Free SVG Backgrounds and Patterns by SVGBackgrounds.com
                </a>
            </div>
        </>
    );
}
