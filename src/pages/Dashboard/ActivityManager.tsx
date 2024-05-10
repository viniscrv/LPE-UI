import { PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { GenericModal } from "../../components/GenericModal";
import { ActivityForm } from "./components/ActivityForm";
import { ActivityGroupForm } from "./components/ActivityGroupForm";

export function ActivityManager() {
    const mock_table_activities = {
        activity_01: {
            activity_name: "activity_name_01",
            activity_group: "activity_group_01",
            recurrence: "recurrence_01",
            until: "until_01",
            created_at: "created_at_01"
        },
        activity_02: {
            activity_name: "activity_name_02",
            activity_group: "activity_group_02",
            recurrence: "recurrence_02",
            until: "until_02",
            created_at: "created_at_02"
        },
        activity_03: {
            activity_name: "activity_name_03",
            activity_group: "activity_group_03",
            recurrence: "recurrence_03",
            until: "until_03",
            created_at: "created_at_03"
        },
        activity_04: {
            activity_name: "activity_name_04",
            activity_group: "activity_group_04",
            recurrence: "recurrence_04",
            until: "until_04",
            created_at: "created_at_04"
        },
        activity_05: {
            activity_name: "activity_name_05",
            activity_group: "activity_group_05",
            recurrence: "recurrence_05",
            until: "until_05",
            created_at: "created_at_05"
        }
    };

    const header_table_activities = [
        "activity name",
        "activity group",
        "recurrence",
        "until",
        "created_at",
        "actions"
    ];

    const header_table_groupers = ["group name", "created_at", "actions"];

    const mock_table_groupers = {
        activity_01: {
            group_name: "group_name_01",
            created_at: "created_at_01"
        },
        activity_02: {
            group_name: "group_name_02",
            created_at: "created_at_02"
        },
        activity_03: {
            group_name: "group_name_03",
            created_at: "created_at_03"
        },
        activity_04: {
            group_name: "group_name_04",
            created_at: "created_at_04"
        },
        activity_05: {
            group_name: "group_name_05",
            created_at: "created_at_05"
        }
    };

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
                                <ActivityForm newActivity={true} />
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
                                {Object.values(mock_table_activities).map(
                                    (item, idx) => {
                                        return (
                                            <tr
                                                key={idx}
                                                className="overflow-y-auto border-t border-neutral-700"
                                            >
                                                <td className="py-2 pl-4 text-start text-neutral-400">
                                                    {item.activity_name}
                                                </td>
                                                <td className="py-2 pl-4 text-start text-neutral-400">
                                                    {item.activity_group}
                                                </td>
                                                <td className="py-2 pl-4 text-start text-neutral-400">
                                                    {item.recurrence}
                                                </td>
                                                <td className="py-2 pl-4 text-start text-neutral-400">
                                                    {item.until}
                                                </td>
                                                <td className="py-2 pl-4 text-start text-neutral-400">
                                                    {item.created_at}
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
                                                                newActivity={
                                                                    false
                                                                }
                                                            />
                                                        </GenericModal>
                                                    </Dialog.Root>
                                                    <button className="flex rounded-md bg-neutral-900/50 p-2  hover:text-red-500">
                                                        <Trash size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
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
                                <ActivityGroupForm newActivityGroup={true} />
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
                                {Object.values(mock_table_groupers).map(
                                    (item, idx) => {
                                        return (
                                            <tr
                                                key={idx}
                                                className="overflow-y-auto border-t border-neutral-700"
                                            >
                                                <td className="py-2 pl-4 text-start text-neutral-400">
                                                    {item.group_name}
                                                </td>
                                                <td className="py-2 pl-4 text-start text-neutral-400">
                                                    {item.created_at}
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
                                                                newActivityGroup={
                                                                    false
                                                                }
                                                            />
                                                        </GenericModal>
                                                    </Dialog.Root>
                                                    <button className="flex rounded-md bg-neutral-900/50 p-2  hover:text-red-500">
                                                        <Trash size={18} />
                                                    </button>
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
