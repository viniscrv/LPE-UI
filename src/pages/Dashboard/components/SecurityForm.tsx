interface SecurityFormProps {
    editMode: boolean;
}

export function SecurityForm({ editMode }: SecurityFormProps) {
    return (
        <form action="" className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="flex flex-col">
                <label>Senha</label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1 disabled:cursor-not-allowed disabled:text-neutral-400"
                    disabled={!editMode}
                    type="text"
                    placeholder="Sua nova senha"
                />
            </div>

            <div className="flex flex-col">
                <label>Confirmação de senha</label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1 disabled:cursor-not-allowed disabled:text-neutral-400"
                    disabled={!editMode}
                    type="text"
                    placeholder="Confirmação da nova senha"
                />
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
