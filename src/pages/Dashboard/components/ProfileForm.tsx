interface ProfileFormProps {
    profileData: {
        id: Number;
        user: Number;
        username: string;
        biography: string;
    };
}

export function ProfileForm({ profileData }: ProfileFormProps) {
    return (
        <form action="" className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="flex flex-col">
                <label>Primeiro nome</label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="text"
                    defaultValue={profileData.username}
                />
            </div>
            <div className="flex flex-col">
                <label>Segundo nome</label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="text"
                    defaultValue={profileData.username}
                />
            </div>
            <div className="flex flex-col">
                <label>Nome de usuário</label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="text"
                    defaultValue={profileData.username}
                />
            </div>
            <div className="flex flex-col">
                <label>E-mail</label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="text"
                    defaultValue={profileData.username}
                />
            </div>
            <div className="col-span-2 flex flex-col">
                <label>Biografia</label>
                <textarea
                    className=" mt-1 h-24 rounded-md border border-neutral-500 bg-transparent p-1"
                    defaultValue={profileData.biography}
                />
            </div>

            <button
                disabled
                className="col-span-2 mt-4 h-10 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400"
            >
                Salvar
            </button>
        </form>
    );
}
