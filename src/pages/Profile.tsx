import { Lock, Pen, User } from "@phosphor-icons/react";

export function Profile() {
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

                        <form
                            action=""
                            className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3"
                        >
                            <div className="flex flex-col">
                                <label>Primeiro nome</label>
                                <input
                                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label>Segundo nome</label>
                                <input
                                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label>Nome de usuário</label>
                                <input
                                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label>E-mail</label>
                                <input
                                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                                    type="text"
                                />
                            </div>
                            <div className="col-span-2 flex flex-col">
                                <label>E-mail</label>
                                <textarea className=" mt-1 rounded-md border border-neutral-500 bg-transparent p-1" />
                            </div>

                            <button
                                disabled
                                className="col-span-2 mt-4 h-10 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400"
                            >
                                Salvar
                            </button>
                        </form>
                    </div>

                    <nav className="flex flex-col  gap-2 border border-transparent border-l-neutral-700 p-2">
                        <button className="delay-50 flex h-8 w-full items-center justify-center gap-2 rounded-md bg-neutral-800 py-2 transition hover:bg-neutral-700">
                            <User />
                            Perfil
                        </button>
                        <button className="delay-50 flex h-8 w-full items-center justify-center gap-2 rounded-md bg-neutral-800 py-2 transition hover:bg-neutral-700">
                            <Lock />
                            Segurança
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
