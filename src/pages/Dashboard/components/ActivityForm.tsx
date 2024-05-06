import { Select, SelectItem } from "./Form/Select";

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
                <label className="text-sm" htmlFor="">Recorrência</label>
                <Select placeholder="Selecione">
                    <SelectItem value="everyday" text="Diário" />
                    <SelectItem value="week" text="Semanal" />
                    <SelectItem value="weekend" text="Finais de semanas" />
                </Select>
            </div>
            <div className="mt-2 flex w-full flex-col">
                <label className="text-sm" htmlFor="activityGroup">
                    Grupo de atividade
                </label>
                <Select placeholder="Selecione">
                    <SelectItem value="group_01" text="group_01" />
                </Select>
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
