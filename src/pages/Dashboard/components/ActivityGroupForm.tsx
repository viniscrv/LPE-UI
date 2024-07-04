import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../lib/axios";
import { useContext, useEffect, useState } from "react";
import { ActivityGroup } from "../../../@types/interfaces";
import { ToastContext } from "../../../contexts/ToastContext";

const createActivityGroupFormSchema = z.object({
    activityGroupName: z.string(),
    activityDescription: z.string()
});

type createActivityGroupFormData = z.infer<
    typeof createActivityGroupFormSchema
>;

interface ActivityGroupFormProps {
    activityGroupId?: number | null;
    setModal: (state: boolean) => void;
}

export function ActivityGroupForm({
    activityGroupId = null,
    setModal
}: ActivityGroupFormProps) {
    const { register, handleSubmit } = useForm<createActivityGroupFormData>({
        resolver: zodResolver(createActivityGroupFormSchema)
    });

    const [activityGroup, setActivityGroup] = useState<ActivityGroup | null>();

    const { shootToast } = useContext(ToastContext);

    useEffect(() => {
        if (activityGroupId) {
            getActivityGroup();
        }
    }, []);

    async function getActivityGroup() {
        try {
            const { data } = await api.get(
                `/activities/groups/${activityGroupId}/`
            );

            setActivityGroup(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data) {
                return console.log(err.response.data);
            }
        }
    }

    async function submitActivityGroup(data: createActivityGroupFormData) {
        try {
            if (activityGroupId) {
                await api.patch(`/activities/groups/${activityGroupId}/`, {
                    name: data.activityGroupName,
                    description: data.activityDescription
                });

                shootToast({
                    color: "blue",
                    title: `Você editou um grupo de atividade`,
                    description: "",
                });
                
            } else {
                await api.post("/activities/groups/", {
                    name: data.activityGroupName,
                    description: data.activityDescription
                });
                    
                shootToast({
                    color: "blue",
                    title: `Você adicionou um novo grupo de atividade`,
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
                description: "Falha ao salvar grupo de atividade",
            });
        }
    }

    return (
        <form
            className="mt-4 flex w-full flex-col items-start"
            onSubmit={handleSubmit(submitActivityGroup)}
        >
            <div className="flex w-full flex-col">
                <label className="text-sm" htmlFor="activityGroupName">
                    Nome do grupo
                </label>
                <input
                    className="mt-1 rounded-md bg-transparent p-1"
                    type="text"
                    id="activityGroupName"
                    defaultValue={activityGroup?.name}
                    {...register("activityGroupName")}
                />
            </div>

            <div className="flex w-full flex-col mt-4">
                <label className="text-sm" htmlFor="activityGroupName">
                    Descrição curta
                </label>
                <textarea
                    className="mt-1 rounded-md bg-transparent p-1"
                    id="activityDescription"
                    defaultValue={activityGroup?.description}
                    {...register("activityDescription")}
                />
            </div>

            <button className="mt-4 h-8 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400">
                {!activityGroupId ? "Criar" : "Salvar alterações"}
            </button>
        </form>
    );
}
