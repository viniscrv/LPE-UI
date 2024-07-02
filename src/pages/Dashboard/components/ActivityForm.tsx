import { z } from "zod";
import { Select, SelectItem } from "./Form/Select";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../lib/axios";
import { AxiosError } from "axios";
import { Activity, ActivityGroup } from "../../../@types/interfaces";
import { ToastContext } from "../../../contexts/ToastContext";

const createActivityFormSchema = z.object({
    activityName: z.string(),
    activityUntil: z.string()
});

type createActivityFormData = z.infer<typeof createActivityFormSchema>;

interface ActivityFormProps {
    activityId?: number | null;
    activityGroups: ActivityGroup[] | [];
    setModal: (state: boolean) => void;
}

export function ActivityForm({
    activityId = null,
    activityGroups = [],
    setModal
}: ActivityFormProps) {
    const [recurrence, setRecurrence] = useState<string | null>();
    const [activityGroup, setActivityGroup] = useState<string | null>();
    const [activity, setActivity] = useState<Activity | null>();


    const { register, handleSubmit } = useForm<createActivityFormData>({
        resolver: zodResolver(createActivityFormSchema)
    });

    const { shootToast } = useContext(ToastContext);

    useEffect(() => {
        if (activityId) {
            getActivity();
        }
    }, []);

    async function submitActivity(data: createActivityFormData) {
        try {
            if (activityId) {
                await api.patch(`/activities/${activityId}/`, {
                    name: data.activityName,
                    recurrence: recurrence,
                    activity_group_id: Number(activityGroup),
                    until: data.activityUntil
                });

                shootToast({
                    color: "blue",
                    title: `Você editou uma atividade`,
                    description: "",
                });

            } else {
                await api.post("/activities/", {
                    name: data.activityName,
                    recurrence: recurrence,
                    activity_group_id: Number(activityGroup),
                    until: data.activityUntil
                });

                shootToast({
                    color: "blue",
                    title: `Você adicionou uma nova atividade`,
                    description: "",
                });
            }

            setModal(false);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data) {
                return console.log(err.response.data);
            }

            shootToast({
                color: "red",
                title: "Tente novamente",
                description: "Falha ao salvar atividade",
            });
        }
    }

    async function getActivity() {
        try {
            const { data } = await api.get(`/activities/${activityId}/`);

            setActivity(data);
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
                    className="mt-1 rounded-md bg-transparent p-1"
                    type="text"
                    id="activityName"
                    defaultValue={activity?.name}
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
                    <SelectItem value="everyday" text="Diária" />
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
                    {activityGroups.map((activityGroupItem) => {
                        return (
                            <SelectItem key={activityGroupItem.id} value={activityGroupItem.id.toString()} text={activityGroupItem.name} />
                        )
                    })}
                </Select>
            </div>
            <div className="mt-2 flex w-full flex-col">
                <label className="text-sm" htmlFor="activityUntil">
                    Até
                </label>
                <input
                    className="mt-1 rounded-md bg-transparent p-1"
                    type="date"
                    id="activityUntil"
                    defaultValue={activity?.until}
                    {...register("activityUntil")}
                />
            </div>

            <button className="mt-4 h-8 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400">
                {!activityId ? "Criar" : "Salvar alterações"}
            </button>
        </form>
    );
}
