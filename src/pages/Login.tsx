import { NavLink, useNavigate } from "react-router-dom";

export function Login() {

    const navigate = useNavigate();

    function login() {
        // TODO: validar formato dos campos
        // TODO: chamar a API com as credenciais

        navigate("/home");
    }

    return (
        <>
            <div className="w-full min-h-screen flex flex-col justify-center items-center">
                <div className="bg-neutral-900 min-w-96 border-blue-400 border rounded-md flex flex-col items-center py-8 px-6">
                    <div className="flex flex-col w-full">
                        <label htmlFor="username" className="text-sm">Nome de úsuario</label>
                        <input id="username" type="text" className="border-neutral-500 border rounded-md bg-transparent p-1 mt-1" />
                    </div>
                    <div className="flex flex-col mt-2 w-full">
                        <label htmlFor="password" className="text-sm">Senha</label>
                        <input id="password" type="password" className="border-neutral-500 border rounded-md bg-transparent p-1 mt-1" />
                    </div>

                    <button
                        onClick={login} 
                        className="w-full bg-blue-500 hover:bg-blue-400 py-2 px-4 mt-4 rounded-md text-neutral-50">
                            Log In
                    </button>
                </div>

                <p className="pt-2">Ainda não tem uma conta? <NavLink to={"/register"} className="text-neutral-50">Registre-se</NavLink></p>
            </div>
        </>
    )
}