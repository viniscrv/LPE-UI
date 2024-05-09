import { z } from "zod";
import { Select, SelectItem } from "./Form/Select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../lib/axios";
import { AxiosError } from "axios";

const createActivityFormSchema = z.object({
    activityName: z.string(),
    activityUntil: z.string()
});

type createActivityFormData = z.infer<typeof createActivityFormSchema>;

interface ActivityFormProps {
    newActivity: Boolean; // TODO: aqui eh melhor eu receber o ID, se ID == null é new acitivity, se não faz a request buscando dados para o edit
}

export function ActivityForm({ newActivity }: ActivityFormProps) {
    const [recurrence, setRecurrence] = useState<null | string>();
    const [activityGroup, setActivityGroup] = useState<null | string>();

    // const [open, setOpen] = useState(false); # TODO: fazer o modal fechar depois do confirm

    const { register, handleSubmit } = useForm<createActivityFormData>({
        resolver: zodResolver(createActivityFormSchema)
    });

    async function submitActivity(data: createActivityFormData) {
        console.log("data", data);
        console.log("recurrence", recurrence);
        console.log("activityGroup", activityGroup);

        try {
            await api.post("/activities/", {
                name: data.activityName,
                recurrence: recurrence,
                until: data.activityUntil
            });
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data) {
                return console.log(err.response.data);
            }
        }
    }

    return (
        <form
            className="mt-4 flex w-full flex-col items-start"
            onSubmit={handleSubmit(submitActivity)}
        >
            <div className="flex w-full flex-col">
                <label className="text-sm" htmlFor="activityName">
                    Nome da atividade
                </label>
                <input
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="text"
                    id="activityName"
                    {...register("activityName")}
                />
            </div>
            <div className="mt-2 flex w-full flex-col">
                <label className="text-sm" htmlFor="">
                    Recorrência
                </label>
                <Select
                    placeholder="Selecione"
                    onValueChange={(value) => setRecurrence(value)}
                >
                    <SelectItem value="everyday" text="Diário" />
                    <SelectItem value="week" text="Semanal" />
                    <SelectItem value="weekend" text="Finais de semanas" />
                </Select>
            </div>
            <div className="mt-2 flex w-full flex-col">
                <label className="text-sm" htmlFor="activityGroup">
                    Grupo de atividade
                </label>
                <Select
                    placeholder="Selecione"
                    onValueChange={(value) => setActivityGroup(value)}
                >
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
                    id="activityUntil"
                    {...register("activityUntil")}
                />
            </div>

            <button className="mt-4 h-8 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400">
                {newActivity ? "Criar" : "Salvar alterações"}
            </button>
        </form>
    );
}
