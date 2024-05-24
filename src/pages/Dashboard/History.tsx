import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import { GenericModal } from "../../components/GenericModal";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const editReportEffortPerceptionFormSchema = z.object({
    effortPerception: z.string()
});

type editReportEffortPerceptionFormData = z.infer<
    typeof editReportEffortPerceptionFormSchema
>;

export function History() {
    const header_table_activities = [
        "activity name",
        "activity group",
        "recurrence",
        "until",
        "effort_perception",
        "completed_at",
        "actions"
    ];

    interface History {
        count: number;
        next: number | null;
        previous: number | null;
        results: {
            id: number;
            profile: number;
            activity: number;
            effort_perception: number;
            completed: boolean;
            completed_at: string;
        }[];
    }

    const [history, setHistory] = useState<History>();
    const [selectedReport, setSelectedReport] = useState<null | Number>(null);

    const [open, setOpen] = useState(false);

    const { handleSubmit, control } =
        useForm<editReportEffortPerceptionFormData>({
            resolver: zodResolver(editReportEffortPerceptionFormSchema)
        });

    useEffect(() => {
        getHistory();
    }, []);

    async function editReportEffortPerception({
        effortPerception
    }: editReportEffortPerceptionFormData) {
        try {
            await api.patch(`/activities/report/edit/${selectedReport}/`, {
                effort_perception: Number(effortPerception)
            });

            getHistory();
            setSelectedReport(null);
            setOpen(false);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function getHistory() {
        try {
            const { data } = await api.get("/activities/report/history/");

            setHistory(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function deleteReport(reportId: number) {
        try {
            await api.delete(`activities/report/delete/${reportId}/`);

            getHistory();
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
                                {history?.results.map((item, idx) => {
                                    return (
                                        <tr
                                            key={idx}
                                            className="overflow-y-auto border-t border-neutral-700"
                                        >
                                            <td className="py-2 pl-4 text-start text-neutral-400">
                                                TODO: ajustar no back
                                            </td>
                                            <td className="py-2 pl-4 text-start text-neutral-400">
                                                TODO: ajustar no back
                                            </td>
                                            <td className="py-2 pl-4 text-start text-neutral-400">
                                                TODO: ajustar no back
                                            </td>
                                            <td className="py-2 pl-4 text-start text-neutral-400">
                                                TODO: ajustar no back
                                            </td>
                                            <td className="py-2 pl-4 text-start text-neutral-400">
                                                {item.effort_perception.toString()}
                                            </td>
                                            <td className="py-2 pl-4 text-start text-neutral-400">
                                                {item.completed_at.toString()}
                                            </td>
                                            <td className="flex gap-2 py-2 pl-4">
                                                <Dialog.Root
                                                    open={open}
                                                    onOpenChange={setOpen}
                                                >
                                                    <Dialog.Trigger asChild>
                                                        <button
                                                            onClick={() =>
                                                                setSelectedReport(
                                                                    item.id
                                                                )
                                                            }
                                                            className="flex rounded-md bg-neutral-900/50 p-2  hover:text-blue-500"
                                                        >
                                                            <PencilSimple
                                                                size={18}
                                                            />
                                                        </button>
                                                    </Dialog.Trigger>

                                                    <GenericModal
                                                        titleModal="Editar atividade"
                                                        descriptionModal="Altere os campos abaixo para editar a atividade"
                                                    >
                                                        <form
                                                            onSubmit={handleSubmit(
                                                                editReportEffortPerception
                                                            )}
                                                        >
                                                            <Controller
                                                                control={
                                                                    control
                                                                }
                                                                name="effortPerception"
                                                                render={({
                                                                    field
                                                                }) => {
                                                                    return (
                                                                        <RadioGroup.Root
                                                                            asChild
                                                                            onValueChange={
                                                                                field.onChange
                                                                            }
                                                                            value={
                                                                                field.value
                                                                            }
                                                                        >
                                                                            <div className="mt-4 flex w-full justify-around">
                                                                                {[
                                                                                    "1",
                                                                                    "2",
                                                                                    "3",
                                                                                    "4",
                                                                                    "5",
                                                                                    "6",
                                                                                    "7",
                                                                                    "8",
                                                                                    "9",
                                                                                    "10"
                                                                                ].map(
                                                                                    (
                                                                                        num
                                                                                    ) => {
                                                                                        return (
                                                                                            <RadioGroup.Item
                                                                                                key={
                                                                                                    num
                                                                                                }
                                                                                                value={
                                                                                                    num
                                                                                                }
                                                                                                className="
                                                                                flex
                                                                                w-10
                                                                                items-center
                                                                                justify-center rounded-md bg-neutral-800 p-2 
                                                                                hover:bg-blue-500 data-[state=checked]:border-2 
                                                                                data-[state=checked]:border-neutral-50 data-[state=checked]:bg-blue-500
                                                                            "
                                                                                            >
                                                                                                {
                                                                                                    num
                                                                                                }
                                                                                            </RadioGroup.Item>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </div>
                                                                        </RadioGroup.Root>
                                                                    );
                                                                }}
                                                            />
                                                            <button className="mt-4 h-8 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400">
                                                                Concluír
                                                            </button>
                                                        </form>
                                                    </GenericModal>
                                                </Dialog.Root>
                                                <Dialog.Root>
                                                    <Dialog.Trigger asChild>
                                                        <button className="flex rounded-md bg-neutral-900/50 p-2  hover:text-red-500">
                                                            <Trash size={18} />
                                                        </button>
                                                    </Dialog.Trigger>
                                                    <GenericModal
                                                        titleModal="Remover relatório"
                                                        descriptionModal="Tem certeza que deseja remover este relatório do histórico?"
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                deleteReport(
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
        </div>
    );
}
