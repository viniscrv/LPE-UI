import { Plus } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { GenericModal } from "../../components/GenericModal";
import { ActivityForm } from "./components/ActivityForm";
import { ActivityGroupForm } from "./components/ActivityGroupForm";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { GenericTable } from "../../components/GenericTable";

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

    const [selectedActivity, setSelectedActivity] = useState<number | null>(
        null
    );
    const [selectedActivityGroup, setSelectedActivityGroup] = useState<
        number | null
    >(null);

    const [openNewActivity, setOpenNewActivity] = useState(false);
    const [openEditActivity, setOpenEditActivity] = useState(false);
    const [openDeleteActivity, setOpenDeleteActivity] = useState(false);

    const [openNewActivityGroup, setOpenNewActivityGroup] = useState(false);
    const [openEditActivityGroup, setOpenEditActivityGroup] = useState(false);
    const [openDeleteActivityGroup, setOpenDeleteActivityGroup] =
        useState(false);

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
    }, [
        openNewActivity,
        openEditActivity,
        openDeleteActivity,
        openNewActivityGroup,
        openEditActivityGroup,
        openDeleteActivityGroup
    ]);

    function openEditActivityModal(itemId: number) {
        setSelectedActivity(itemId);
        setOpenEditActivity(true);
    }

    function openDeleteActivityModal(itemId: number) {
        setSelectedActivity(itemId);
        setOpenDeleteActivity(true);
    }

    function openEditActivityGroupModal(itemId: number) {
        setSelectedActivityGroup(itemId);
        setOpenEditActivityGroup(true);
    }

    function openDeleteActivityGroupModal(itemId: number) {
        setSelectedActivityGroup(itemId);
        setOpenDeleteActivityGroup(true);
    }

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

    async function deleteActivity() {
        try {
            await api.delete(`/activities/${selectedActivity}/`);

            getActivities();
            setOpenDeleteActivity(false);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function deleteActivityGroup() {
        try {
            await api.delete(
                `/activities/groups/delete/${selectedActivityGroup}/`
            );

            getActivityGroups();
            setOpenDeleteActivityGroup(false);
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

                        <Dialog.Root
                            open={openNewActivity}
                            onOpenChange={setOpenNewActivity}
                        >
                            <button
                                onClick={() => setOpenNewActivity(true)}
                                className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-neutral-50 hover:bg-blue-400"
                            >
                                Nova atividade
                                <Plus size={20} />
                            </button>
                            <GenericModal
                                titleModal="Criar nova atividade"
                                descriptionModal="Preencha as informação para criar uma nova atividade"
                            >
                                <ActivityForm
                                    activityGroups={activityGroups}
                                    setModal={setOpenNewActivity}
                                />
                            </GenericModal>
                        </Dialog.Root>
                    </div>
                    <div className="overflow-y-scroll">
                        <GenericTable
                            header={header_table_activities}
                            fields={[
                                "name",
                                "activity_group",
                                "recurrence",
                                "until",
                                "created_at"
                            ]}
                            data={Object.values(activities)}
                            editAction={true}
                            deleteAction={true}
                            editItem={openEditActivityModal}
                            deleteItem={openDeleteActivityModal}
                        />
                        <Dialog.Root
                            open={openEditActivity}
                            onOpenChange={setOpenEditActivity}
                        >
                            <GenericModal
                                titleModal="Editar atividade"
                                descriptionModal="Altere os campos abaixo para editar a atividade"
                            >
                                <ActivityForm
                                    activityId={selectedActivity}
                                    activityGroups={activityGroups}
                                    setModal={setOpenEditActivity}
                                />
                            </GenericModal>
                        </Dialog.Root>
                        <Dialog.Root
                            open={openDeleteActivity}
                            onOpenChange={setOpenDeleteActivity}
                        >
                            <GenericModal
                                titleModal="Remover atividade"
                                descriptionModal="Tem certeza que deseja remover a atividade?"
                            >
                                <button
                                    onClick={() => deleteActivity()}
                                    className="mt-4 h-8 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400"
                                >
                                    Confirmar
                                </button>
                            </GenericModal>
                        </Dialog.Root>
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
                        <Dialog.Root
                            open={openNewActivityGroup}
                            onOpenChange={setOpenNewActivityGroup}
                        >
                            <button
                                onClick={() => setOpenNewActivityGroup(true)}
                                className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-neutral-50 hover:bg-blue-400"
                            >
                                Novo grupo
                                <Plus size={20} />
                            </button>
                            <GenericModal
                                titleModal="Criar novo grupo"
                                descriptionModal="Preencha as informação para criar um novo grupo de atividades"
                            >
                                <ActivityGroupForm
                                    setModal={setOpenNewActivityGroup}
                                />
                            </GenericModal>
                        </Dialog.Root>
                    </div>
                    <div className="overflow-y-scroll">
                        <GenericTable
                            header={header_table_groupers}
                            fields={["name", "description"]}
                            data={Object.values(activityGroups)}
                            editAction={true}
                            deleteAction={true}
                            editItem={openEditActivityGroupModal}
                            deleteItem={openDeleteActivityGroupModal}
                        />
                        <Dialog.Root
                            open={openEditActivityGroup}
                            onOpenChange={setOpenEditActivityGroup}
                        >
                            <GenericModal
                                titleModal="Editar grupo"
                                descriptionModal="Altere os campos abaixo para editar o grupo de atividades"
                            >
                                <ActivityGroupForm
                                    activityGroupId={selectedActivityGroup}
                                    setModal={setOpenEditActivityGroup}
                                />
                            </GenericModal>
                        </Dialog.Root>

                        <Dialog.Root
                            open={openDeleteActivityGroup}
                            onOpenChange={setOpenDeleteActivityGroup}
                        >
                            <GenericModal
                                titleModal="Remover grupo"
                                descriptionModal="Tem certeza que deseja remover o grupo de atividade?"
                            >
                                <button
                                    onClick={() => deleteActivityGroup()}
                                    className="mt-4 h-8 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400"
                                >
                                    Confirmar
                                </button>
                            </GenericModal>
                        </Dialog.Root>
                    </div>
                </div>
            </div>
        </div>
    );
}
