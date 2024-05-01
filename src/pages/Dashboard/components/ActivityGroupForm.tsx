export function ActivityGroupForm() {
    return (
        <form className="mt-4 flex w-full flex-col items-start">
            <div className="flex w-full flex-col">
                <label className="text-sm" htmlFor="activityName">
                    Nome do grupo
                </label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="text"
                    name="activityName"
                    id="activityName"
                />
            </div>
        </form>
    );
}
