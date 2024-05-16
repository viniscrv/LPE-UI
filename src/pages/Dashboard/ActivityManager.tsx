import { PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { GenericModal } from "../../components/GenericModal";
import { ActivityForm } from "./components/ActivityForm";
import { ActivityGroupForm } from "./components/ActivityGroupForm";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

export function ActivityManager() {
    const header_table_activities = [
        "activity name",
        "activity group",
        "recurrence",
        "until",
        "created_at",
        "actions"
    ];

    const header_table_groupers = ["group name", "description", "actions"];

    const [activities, setActivities] = useState<Activity[]>([]);
    const [activityGroups, setActivityGroups] = useState<ActivityGroup[]>([]);

    interface Activity {
        id: number;
        name: string;
        profile: string;
        activity_group: string;
        recurrence: string;
        until: string;
        created_at: Date;
        updated_at: string;
    }

    interface ActivityGroup {
        id: number;
        name: string;
        profile: string;
        description: string;
    }

    useEffect(() => {
        getActivities();
        getActivityGroups();
    }, []);

    async function getActivities() {
        try {
            const { data } = await api.get("/activities/");

            setActivities(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function getActivityGroups() {
        try {
            const { data } = await api.get("/activities/groups/");

            setActivityGroups(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function deleteActivity(activityId: number) {
        try {
            await api.delete(`/activities/${activityId}/`);

            getActivities();
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function deleteActivityGroup(activityGroupId: number) {
        try {
            await api.delete(`/activities/groups/delete/${activityGroupId}/`);

            getActivityGroups();
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-4">
                <div className="col-span-3 flex max-h-64 flex-col gap-3 rounded-md bg-neutral-900 p-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">
                            Atividades cadastradas
                        </h2>

                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-neutral-50 hover:bg-blue-400">
                                    Nova atividade
                                    <Plus size={20} />
                                </button>
                            </Dialog.Trigger>
                            <GenericModal
                                titleModal="Criar nova atividade"
                                descriptionModal="Preencha as informação para criar uma nova atividade"
                                buttonConfirmationText="Criar"
                            >
                                <ActivityForm activityGroups={activityGroups} />
                            </GenericModal>
                        </Dialog.Root>
                    </div>
                    <div className="overflow-y-scroll">
                        <table className="w-full rounded-md bg-neutral-800 p-4">
                            <thead>
                                <tr>
                                    {header_table_activities.map((item) => {
                                        return (
                                            <th
                                                key={item}
                                                className="py-2 pl-4 text-start"
                                            >
                                                {item}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(activities).map((item, idx) => {
                                    return (
                                        <tr
                                            key={idx}
                                            className="overflow-y-auto border-t border-neutral-700"
                                        >
                                            <td className="py-2 pl-4 text-start text-neutral-400">
                                                {item.name}
                                            </td>
                                            <td className="py-2 pl-4 text-start text-neutral-400">
                                                {item.activity_group
                                                    ? item.activity_group
                                                    : "Nenhum"}
                                            </td>
                                            <td className="py-2 pl-4 text-start text-neutral-400">
                                                {item.recurrence}
                                            </td>
                                            <td className="py-2 pl-4 text-start text-neutral-400">
                                                {item.until}
                                            </td>
                                            <td className="py-2 pl-4 text-start text-neutral-400">
                                                {item.created_at.toString()}
                                            </td>

                                            <td className="flex gap-2 py-2 pl-4">
                                                <Dialog.Root>
                                                    <Dialog.Trigger asChild>
                                                        <button className="flex rounded-md bg-neutral-900/50 p-2  hover:text-blue-500">
                                                            <PencilSimple
                                                                size={18}
                                                            />
                                                        </button>
                                                    </Dialog.Trigger>

                                                    <GenericModal
                                                        titleModal="Editar atividade"
                                                        descriptionModal="Altere os campos abaixo para editar a atividade"
                                                        buttonConfirmationText="Confirmar alterações"
                                                    >
                                                        <ActivityForm
                                                            activityId={item.id}
                                                            activityGroups={
                                                                activityGroups
                                                            }
                                                        />
                                                    </GenericModal>
                                                </Dialog.Root>
                                                <Dialog.Root>
                                                    <Dialog.Trigger asChild>
                                                        <button className="flex rounded-md bg-neutral-900/50 p-2  hover:text-red-500">
                                                            <Trash size={18} />
                                                        </button>
                                                    </Dialog.Trigger>
                                                    <GenericModal
                                                        titleModal="Remover atividade"
                                                        descriptionModal="Tem certeza que deseja remover a atividade?"
                                                        buttonConfirmationText="Criar"
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                deleteActivity(
                                                                    item.id
                                                                )
                                                            }
                                                            className="mt-4 h-8 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400"
                                                        >
                                                            Confirmar
                                                        </button>
                                                    </GenericModal>
                                                </Dialog.Root>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex bg-neutral-950 p-3"></div>
            </div>

            <div className="grid grid-cols-4">
                <div className="col-span-2 flex max-h-64 flex-col gap-3 rounded-md bg-neutral-900 p-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">
                            Grupos cadastrados
                        </h2>
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-neutral-50 hover:bg-blue-400">
                                    Novo grupo
                                    <Plus size={20} />
                                </button>
                            </Dialog.Trigger>
                            <GenericModal
                                titleModal="Criar novo grupo"
                                descriptionModal="Preencha as informação para criar um novo grupo de atividades"
                                buttonConfirmationText="Criar"
                            >
                                <ActivityGroupForm />
                            </GenericModal>
                        </Dialog.Root>
                    </div>
                    <div className="overflow-y-scroll">
                        <table className="w-full rounded-md bg-neutral-800 p-4">
                            <thead>
                                <tr>
                                    {header_table_groupers.map((item) => {
                                        return (
                                            <th
                                                key={item}
                                                className="py-2 pl-4 text-start"
                                            >
                                                {item}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(activityGroups).map(
                                    (item, idx) => {
                                        return (
                                            <tr
                                                key={idx}
                                                className="overflow-y-auto border-t border-neutral-700"
                                            >
                                                <td className="py-2 pl-4 text-start text-neutral-400">
                                                    {item.name}
                                                </td>
                                                <td className="py-2 pl-4 text-start text-neutral-400">
                                                    {item.description
                                                        ? item.description
                                                        : "Sem descrição"}
                                                </td>
                                                <td className="flex gap-2 py-2 pl-4">
                                                    <Dialog.Root>
                                                        <Dialog.Trigger asChild>
                                                            <button className="flex rounded-md bg-neutral-900/50 p-2  hover:text-blue-500">
                                                                <PencilSimple
                                                                    size={18}
                                                                />
                                                            </button>
                                                        </Dialog.Trigger>

                                                        <GenericModal
                                                            titleModal="Editar grupo"
                                                            descriptionModal="Altere os campos abaixo para editar o grupo de atividades"
                                                            buttonConfirmationText="Confirmar alterações"
                                                        >
                                                            <ActivityGroupForm
                                                                activityGroupId={
                                                                    item.id
                                                                }
                                                            />
                                                        </GenericModal>
                                                    </Dialog.Root>

                                                    <Dialog.Root>
                                                        <Dialog.Trigger asChild>
                                                            <button className="flex rounded-md bg-neutral-900/50 p-2  hover:text-red-500">
                                                                <Trash
                                                                    size={18}
                                                                />
                                                            </button>
                                                        </Dialog.Trigger>
                                                        <GenericModal
                                                            titleModal="Remover grupo"
                                                            descriptionModal="Tem certeza que deseja remover o grupo de atividade?"
                                                            buttonConfirmationText="Criar"
                                                        >
                                                            <button
                                                                onClick={() =>
                                                                    deleteActivityGroup(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="mt-4 h-8 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400"
                                                            >
                                                                Confirmar
                                                            </button>
                                                        </GenericModal>
                                                    </Dialog.Root>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
