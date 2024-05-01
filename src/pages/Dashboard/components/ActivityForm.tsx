export function ActivityForm() {
    return (
        <form className="mt-4 flex w-full flex-col items-start">
            <div className="flex w-full flex-col">
                <label className="text-sm" htmlFor="activityName">
                    Nome da atividade
                </label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="text"
                    name="activityName"
                    id="activityName"
                />
            </div>
            <div className="mt-2 flex w-full flex-col">
                <label className="text-sm" htmlFor="activityRecurrence">
                    Recorrência
                </label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="text"
                    name="activityRecurrence"
                    id="activityRecurrence"
                />
            </div>
            <div className="mt-2 flex w-full flex-col">
                <label className="text-sm" htmlFor="activityGroup">
                    Grupo de atividade
                </label>
                <select
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    name="activityGroup"
                    id="activityGroup"
                >
                    <option value="group_01">group_01</option>
                </select>
            </div>
            <div className="mt-2 flex w-full flex-col">
                <label className="text-sm" htmlFor="activityUntil">
                    Até
                </label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="date"
                    name="activityUntil"
                    id="activityUntil"
                />
            </div>
        </form>
    );
}
