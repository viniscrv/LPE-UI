import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../lib/axios";
import { useEffect, useState } from "react";

const createActivityGroupFormSchema = z.object({
    activityGroupName: z.string()
});

type createActivityGroupFormData = z.infer<
    typeof createActivityGroupFormSchema
>;

interface ActivityGroupFormProps {
    activityGroupId?: number | null;
}

interface ActivityGroup {
    id: number;
    name: string;
    profile: string;
    description: string;
}

export function ActivityGroupForm({
    activityGroupId = null
}: ActivityGroupFormProps) {
    const { register, handleSubmit } = useForm<createActivityGroupFormData>({
        resolver: zodResolver(createActivityGroupFormSchema)
    });

    const [activityGroup, setActivityGroup] = useState<ActivityGroup | null>();

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
                    description: ""
                });
            } else {
                await api.post("/activities/groups/", {
                    name: data.activityGroupName,
                });
            }
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data) {
                return console.log(err.response.data);
            }
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
                    className="mt-1 rounded-md border border-neutral-500 bg-transparent p-1"
                    type="text"
                    id="activityGroupName"
                    defaultValue={activityGroup?.name}
                    {...register("activityGroupName")}
                />
            </div>

            <button className="mt-4 h-8 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400">
                {!activityGroupId ? "Criar" : "Salvar alterações"}
            </button>
        </form>
    );
}
