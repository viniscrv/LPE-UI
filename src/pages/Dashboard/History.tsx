import * as Dialog from "@radix-ui/react-dialog";
import { useContext, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";
import { GenericModal } from "../../components/GenericModal";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenericTable } from "../../components/GenericTable";
import { Activity } from "../../@types/interfaces";
import { ToastContext } from "../../contexts/ToastContext";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const editReportEffortPerceptionFormSchema = z.object({
    effortPerception: z.string()
});

type editReportEffortPerceptionFormData = z.infer<
    typeof editReportEffortPerceptionFormSchema
>;

export function History() {
    const header_table_reports = [
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
        next: string | null;
        previous: string | null;
        results: {
            id: number;
            profile: number;
            activity: number;
            effort_perception: number;
            completed: boolean;
            completed_at: string;
        }[];
    }

    interface RecentActivity {
        id: number;
        activity: Activity;
        profile: number;
        created_at: Date;
    }

    const [history, setHistory] = useState<History>();
    const [recentActivities, setRecentActivities] = useState<
        RecentActivity[] | []
    >([]);
    const [selectedReport, setSelectedReport] = useState<null | Number>(null);

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const { handleSubmit, control } =
        useForm<editReportEffortPerceptionFormData>({
            resolver: zodResolver(editReportEffortPerceptionFormSchema)
        });

    useEffect(() => {
        getHistory();
        getRecentActivities();
    }, []);

    const { shootToast } = useContext(ToastContext);

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

    async function navigateInHistory(to: "previous" | "next") {
        if (!history) return;

        let url = null;

        if (to == "previous" && history.previous) {
            url = new URL(history.previous);
        } else if (to == "next" && history.next) {
            url = new URL(history.next);
        }

        if (!url) return;

        const page = url.searchParams.get("page")
        const requestPath = page ? `/activities/report/history/?page=${page}` : "/activities/report/history/"
    
        try {
            const { data } = await api.get(requestPath);

            setHistory(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function getRecentActivities() {
        try {
            const { data } = await api.get("/recent_activity/");

            setRecentActivities(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    function openEditModal(itemId: number) {
        setSelectedReport(itemId);
        setOpenEdit(true);
    }

    function openDeleteModal(itemId: number) {
        setSelectedReport(itemId);
        setOpenDelete(true);
    }

    async function editReportEffortPerception({
        effortPerception
    }: editReportEffortPerceptionFormData) {
        try {
            await api.patch(`/activities/report/edit/${selectedReport}/`, {
                effort_perception: Number(effortPerception)
            });

            getHistory();
            setSelectedReport(null);
            setOpenEdit(false);

            shootToast({
                color: "blue",
                title: `Você editou um registro`,
                description: "",
            });
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }

            shootToast({
                color: "red",
                title: `Tente novamente`,
                description: "Falha ao editar registro",
            });
        }
    }

    async function deleteReport() {
        try {
            await api.delete(`activities/report/delete/${selectedReport}/`);

            getHistory();
            setOpenDelete(false);

            shootToast({
                color: "blue",
                title: `Você removeu um registro`,
                description: "",
            });
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }

            shootToast({
                color: "red",
                title: `Tente novamente`,
                description: "Falha ao remover um registro",
            });
        }
    }

    const effortRate = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    return (
        <div className="flex h-full flex-col gap-6">
            <div className="flex-1 grid grid-cols-4 gap-3 mb-4">
                <div className="col-span-3 flex flex-col h-full gap-3 rounded-md bg-neutral-900 p-3">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-bold">
                            Histórico completo
                        </h2>
                        <div className="flex gap-2">
                            <button
                                className="
                                    flex h-10 w-10 items-center justify-center rounded-md bg-blue-500
                                    text-neutral-50 hover:bg-blue-400 disabled:bg-blue-400/10 disabled:cursor-not-allowed"
                                disabled={history?.previous ? false : true}
                                onClick={() => navigateInHistory("previous")}
                                >
                                    <CaretLeft size={18} />
                            </button>
                            <button
                                className="
                                    flex h-10 w-10 items-center justify-center rounded-md bg-blue-500
                                    text-neutral-50 hover:bg-blue-400 disabled:bg-blue-400/10 disabled:cursor-not-allowed"
                                disabled={history?.next ? false : true}
                                onClick={() => navigateInHistory("next")}
                                >
                                    <CaretRight size={18} />
                            </button>
                        </div>
                    </div>
                        
                    <div className="overflow-y-scroll">
                        {history?.results && (
                            <GenericTable
                                header={header_table_reports}
                                fields={[
                                    "activity.name",
                                    "activity.activity_group.name",
                                    "activity.recurrence",
                                    "activity.until",
                                    "effort_perception",
                                    "completed_at"
                                ]}
                                data={history.results}
                                editAction={true}
                                deleteAction={true}
                                editItem={openEditModal}
                                deleteItem={openDeleteModal}
                            />
                        )}

                        <Dialog.Root open={openEdit} onOpenChange={setOpenEdit}>
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
                                        control={control}
                                        name="effortPerception"
                                        render={({ field }) => {
                                            return (
                                                <RadioGroup.Root
                                                    asChild
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <div className="mt-4 flex w-full justify-around">
                                                        {effortRate.map(
                                                            (num) => {
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
                                                                        {num}
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
                        <Dialog.Root
                            open={openDelete}
                            onOpenChange={setOpenDelete}
                        >
                            <GenericModal
                                titleModal="Remover registro"
                                descriptionModal="Tem certeza que deseja remover este registro do histórico?"
                            >
                                <button
                                    onClick={() => deleteReport()}
                                    className="mt-4 h-8 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400"
                                >
                                    Confirmar
                                </button>
                            </GenericModal>
                        </Dialog.Root>
                    </div>
                </div>
                <div className="flex flex-col h-full rounded-md bg-neutral-900 p-3">
                    <h2 className="text-lg font-bold">
                        Atividade recente
                    </h2>

                    <div className="w-full mt-3 rounded-md bg-neutral-800 py-4">

                        {recentActivities.map((recentActivity) => {
                            return (
                                <div key={recentActivity.id} className="border border-transparent border-b-neutral-700 py-4 px-2">
                                    <p className="text-sm mb-1 text-neutral-400">{recentActivity.created_at.toString()}</p>
                                    Você completou <span className="font-bold">{recentActivity.activity.name}</span>
                                </div>
                            )
                        })}
                        
                        {/* <div className="border border-transparent border-b-neutral-700 py-4 px-2">
                            <p className="text-sm mb-1 text-neutral-400">Hoje</p>
                            Você completou <span className="font-bold">"Activity name"</span>
                        </div>
                        <div className="border border-transparent border-b-neutral-700 py-4 px-2">
                            <p className="text-sm mb-1 text-neutral-400">Hoje</p>
                            Você excluiu um registro de <span className="font-bold">"Activity name"</span>
                        </div>
                        <div className="border border-transparent border-b-neutral-700 py-4 px-2">
                            <p className="text-sm mb-1 text-neutral-400">Hoje</p>
                            Você editou <span className="font-bold">"Activity name"</span>
                        </div>
                        <div className="border border-transparent border-b-neutral-700 py-4 px-2">
                            <p className="text-sm mb-1 text-neutral-400">Hoje</p>
                            Você editou <span className="font-bold">"Activity name"</span>
                        </div>
                        <div className="border border-transparent border-b-neutral-700 py-4 px-2">
                            <p className="text-sm mb-1 text-neutral-400">Hoje</p>
                            Você editou <span className="font-bold">"Activity name"</span>
                        </div>
                        <div className="border border-transparent border-b-neutral-700 py-4 px-2">
                            <p className="text-sm mb-1 text-neutral-400">Hoje</p>
                            Você editou <span className="font-bold">"Activity name"</span>
                        </div>
                        <div className="border border-transparent border-b-neutral-700 py-4 px-2">
                            <p className="text-sm mb-1 text-neutral-400">Hoje</p>
                            Você editou <span className="font-bold">"Activity name"</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
