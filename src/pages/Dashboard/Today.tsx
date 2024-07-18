import * as Dialog from "@radix-ui/react-dialog";
import { GenericModal } from "../../components/GenericModal";
import { useContext, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponsivePie } from "@nivo/pie";
import { Link, NavLink } from "react-router-dom";
import { GenericTable } from "../../components/GenericTable";
import { Activity } from "../../@types/interfaces";
import { PlusCircle } from "@phosphor-icons/react";
import { ToastContext } from "../../contexts/ToastContext";
import { translate } from "../../utils/translator";
import { DashboardContext } from "../../contexts/DashboardContext";
import noData from "/undraw/undraw_no_data_re_kwbl.svg";

const completeActivityFormSchema = z.object({
    effortPerception: z.string()
});

type completeActivityFormData = z.infer<typeof completeActivityFormSchema>;

export function Today() {
    const header_table = [
        "Atividade",
        "Percepção de esforço",
        "Grupo de atividade",
        "Até",
        "Desfazer"
    ];

    interface PerformedActivity {
        id: Number;
        activity: Activity;
        completed: Boolean;
        profile: Number;
        effort_perception: String;
        created_at: String;
    }

    const [pendingActivities, setPendingActivities] = useState([]);
    const [historyToday, setHistoryToday] = useState<[] | PerformedActivity[]>(
        []
    );
    const [selectedActivity, setSelectedActivity] = useState<null | Number>(
        null
    );

    const [completedTodayPercentage, setCompletedTodayPercentage] = useState(0);
    const [pieChartData, setPieChartData] = useState<{}[]>([]);

    const [open, setOpen] = useState(false);

    const { handleSubmit, control } = useForm<completeActivityFormData>({
        resolver: zodResolver(completeActivityFormSchema)
    });

    const { shootToast } = useContext(ToastContext);
    const { setDashboardPageTitle } = useContext(DashboardContext);

    useEffect(() => {
        getTodaysPendingActivities();
        getTodaysHistory();
        setDashboardPageTitle("Programação diária");
    }, []);

    useEffect(() => {
        updatePieChartData();
    }, [pendingActivities]);

    useEffect(() => {
        getCompletedTodayPercentage();
    }, [historyToday.length, pendingActivities.length]);

    async function getTodaysHistory() {
        try {
            const { data } = await api.get("/activities/report/history_today/");

            setHistoryToday(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function getTodaysPendingActivities() {
        try {
            const { data } = await api.get("/activities/report/pending_today/");

            setPendingActivities(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function completeActivity({
        effortPerception
    }: completeActivityFormData) {
        try {
            await api.post("/activities/report/", {
                activity_id: selectedActivity,
                completed: true,
                effort_perception: Number(effortPerception)
            });

            getTodaysPendingActivities();
            getTodaysHistory();

            setSelectedActivity(null);
            setOpen(false);

            shootToast({
                color: "blue",
                title: `Você completou uma atividade`,
                description: "Atividade completa"
            });
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }

            shootToast({
                color: "red",
                title: `Tente novamente`,
                description: "Falha ao completar atividade"
            });
        }
    }

    async function undoActivity(activityId: Number) {
        try {
            await api.delete(`/activities/report/${activityId}/`);

            getTodaysPendingActivities();
            getTodaysHistory();

            shootToast({
                color: "blue",
                title: `Você desfez uma atividade`,
                description: "Atividade está pendente novamente"
            });
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }

            shootToast({
                color: "red",
                title: `Tente novamente`,
                description: "Falha ao desfazer atividade"
            });
        }
    }

    function updatePieChartData() {
        const totalActivities = pendingActivities.length + historyToday.length;

        if (totalActivities == 0)
            setPieChartData([
                {
                    id: "Pendente",
                    label: "Pendente",
                    value: 0
                },
                {
                    id: "Concluído",
                    label: "Concluído",
                    value: 1
                }
            ]);
        else {
            const data = [
                {
                    id: "Pendente",
                    label: "Pendente",
                    value: (pendingActivities.length / totalActivities) * 100
                },
                {
                    id: "Concluído",
                    label: "Concluído",
                    value: (historyToday.length / totalActivities) * 100
                }
            ];

            setPieChartData(data);
        }
    }

    function getCompletedTodayPercentage() {
        const totalActivities = pendingActivities.length + historyToday.length;

        const data = Number(
            ((historyToday.length / totalActivities) * 100).toFixed(0)
        );

        if (!isNaN(data)) setCompletedTodayPercentage(data);
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 md:grid md:grid-cols-4">
                <div className="flex h-64 w-full flex-col gap-3 rounded-md bg-neutral-900 p-3 md:col-span-3">
                    <h2 className="text-lg font-bold">
                        Atividades programadas para hoje
                    </h2>
                    <div className="flex flex-1 gap-3 overflow-x-auto">
                        {pendingActivities.map((activity: Activity, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex h-full w-44 min-w-44 flex-col rounded-md bg-neutral-800 p-2"
                                >
                                    <div className="max-h-32 w-full flex-1 overflow-y-auto">
                                        <h3 className="text-lg font-bold">
                                            {activity.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-neutral-400">
                                            Recorrência:{" "}
                                            {translate(activity.recurrence)}
                                        </p>
                                        <p className="mt-2 text-sm text-neutral-400">
                                            Grupo de atividade:{" "}
                                            {activity?.activity_group.name
                                                ? activity.activity_group.name
                                                : "Nenhum"}
                                        </p>
                                    </div>

                                    {/* modal */}
                                    <Dialog.Root
                                        open={open}
                                        onOpenChange={setOpen}
                                    >
                                        <Dialog.Trigger asChild>
                                            <button
                                                onClick={() =>
                                                    setSelectedActivity(
                                                        activity.id
                                                    )
                                                }
                                                className="mt-2 h-8 w-full self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400"
                                            >
                                                Completar
                                            </button>
                                        </Dialog.Trigger>
                                        <GenericModal
                                            titleModal={`Completar atividade`}
                                            descriptionModal="Em uma escala de 0 a 10, quanto de esforço você precisou para executar a atividade?"
                                        >
                                            <form
                                                onSubmit={handleSubmit(
                                                    completeActivity
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
                                </div>
                            );
                        })}
                        <Link
                            to={"/dashboard/activity-manager"}
                            className="group flex h-full w-44 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dotted border-neutral-800 p-2"
                        >
                            <div className="flex min-w-44 flex-col items-center justify-center gap-2 text-center text-lg font-bold text-neutral-200">
                                Adicionar mais atividades
                                <PlusCircle
                                    size={32}
                                    className="group-hover:animate-pulse group-hover:fill-blue-400"
                                />
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex h-64 gap-3 rounded-md bg-neutral-900 p-3">
                    <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2">
                        <ResponsivePie
                            data={pieChartData}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20
                            }}
                            innerRadius={0.9}
                            padAngle={2}
                            colors={{ scheme: "paired" }}
                            enableArcLabels={false}
                            endAngle={-360}
                            arcLinkLabelsColor={"#fff"}
                            arcLinkLabelsTextColor={"#fff"}
                        />
                        <h3 className="absolute text-2xl font-bold">
                            {completedTodayPercentage.toString()}%
                        </h3>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-6 md:grid md:grid-cols-4">
                <div className="flex w-full flex-col gap-3 rounded-md bg-neutral-900 p-3 md:col-span-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">Histórico de hoje</h2>
                        <NavLink
                            to={"/dashboard/history"}
                            className="flex rounded-md bg-neutral-950/60 px-4 py-2 hover:bg-neutral-950/40"
                        >
                            Ver histórico completo
                        </NavLink>
                    </div>
                    <div
                        className={`${historyToday.length > 0 && "overflow-y-scroll"}`}
                    >
                        {historyToday.length > 0 ? (
                            <GenericTable
                                header={header_table}
                                fields={[
                                    "activity.name",
                                    "effort_perception",
                                    "activity.activity_group.name",
                                    "activity.until"
                                ]}
                                data={historyToday}
                                editAction={true}
                                deleteAction={true}
                                undoAction={true}
                                undoItem={undoActivity}
                            />
                        ) : (
                            <div className="mx-auto mt-4 flex flex-col items-center justify-center md:w-96">
                                <img src={noData} className="h-24 w-24" />
                                <h2 className="mt-4 text-lg font-bold">
                                    Nenhum registro encontrado
                                </h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
