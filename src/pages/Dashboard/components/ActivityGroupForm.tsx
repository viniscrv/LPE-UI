import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../lib/axios";

const createActivityGroupFormSchema = z.object({
    activityGroupName: z.string()
});

type createActivityGroupFormData = z.infer<
    typeof createActivityGroupFormSchema
>;

interface ActivityGroupFormProps {
    newActivityGroup: Boolean; // TODO: aqui eh melhor eu receber o ID, se ID == null é new acitivity, se não faz a request buscando dados para o edit
}

export function ActivityGroupForm({
    newActivityGroup
}: ActivityGroupFormProps) {
    const { register, handleSubmit } = useForm<createActivityGroupFormData>({
        resolver: zodResolver(createActivityGroupFormSchema)
    });

    async function submitActivityGroup(data: createActivityGroupFormData) {
        try {
            await api.post("/activities/groups/", {
                name: data.activityGroupName
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
                    {...register("activityGroupName")}
                />
            </div>

            <button className="mt-4 h-8 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400">
                {newActivityGroup ? "Criar" : "Salvar alterações"}
            </button>
        </form>
    );
}
