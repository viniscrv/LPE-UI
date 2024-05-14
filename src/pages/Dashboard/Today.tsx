import { ArrowUDownLeft } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { GenericModal } from "../../components/GenericModal";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponsivePie } from "@nivo/pie";

const completeActivityFormSchema = z.object({
    effortPerception: z.string()
});

type completeActivityFormData = z.infer<typeof completeActivityFormSchema>;

export function Today() {
    const header_table = [
        "activity name",
        "effort perception",
        "activity group",
        "until",
        "undo"
    ];

    interface Activity {
        id: Number;
        profile: Number;
        name: String;
        activity_group: Number;
        recurrence: String;
        until: String;
        created_at: String;
        updated_at: String;
    }

    interface PerformedActivity {
        id: Number;
        activity: Number;
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

    const [pieChartData, setPieChartData] = useState<{}[]>([]);
    const [open, setOpen] = useState(false);

    const { handleSubmit, control } = useForm<completeActivityFormData>({
        resolver: zodResolver(completeActivityFormSchema)
    });

    useEffect(() => {
        getTodaysPendingActivities();
        getTodaysHistory();
    }, []);

    useEffect(() => {
        updatePieChartData();
    }, [pendingActivities]);

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

            console.log("pending", pendingActivities)
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
                activity: selectedActivity,
                completed: true,
                effort_perception: Number(effortPerception)
            });

            getTodaysPendingActivities();
            getTodaysHistory();

            setSelectedActivity(null);
            setOpen(false);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function undoActivity(activityId: Number) {
        try {
            await api.delete(`/activities/report/${activityId}/`);

            getTodaysPendingActivities();
            getTodaysHistory();
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    function updatePieChartData() {
        const totalActivities = pendingActivities.length + historyToday.length;

        const data = [
            {
                id: "Concluído",
                label: "Concluído",
                value: (historyToday.length / totalActivities) * 100
            },
            {
                id: "Pendente",
                label: "Pendente",
                value: (pendingActivities.length / totalActivities) * 100
            }
        ];

        setPieChartData(data);
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-4 gap-6">
                <div className="col-span-3 flex h-64 w-full gap-3 rounded-md bg-neutral-900 p-3">
                    {pendingActivities.map((activity: Activity, index) => {
                        return (
                            <div
                                key={index}
                                className="flex h-full w-44 flex-col rounded-md bg-neutral-800 p-2"
                            >
                                <div className="w-full flex-1">
                                    <h3 className="text-lg font-bold">
                                        {activity.name}
                                    </h3>
                                    <p className="mt-2 text-sm text-neutral-400">
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit.
                                    </p>
                                </div>

                                {/* modal */}
                                <Dialog.Root open={open} onOpenChange={setOpen}>
                                    <Dialog.Trigger asChild>
                                        <button
                                            onClick={() =>
                                                setSelectedActivity(activity.id)
                                            }
                                            className="mt-2 h-8 w-full self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400"
                                        >
                                            Completar
                                        </button>
                                    </Dialog.Trigger>
                                    <GenericModal
                                        titleModal="Completar 'activity name'"
                                        descriptionModal="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                        buttonConfirmationText="Concluír"
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
                                                            value={field.value}
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
                                                                ].map((num) => {
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
                                                                })}
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
                </div>
                <div className="flex gap-3 rounded-md bg-neutral-900 p-3">
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
                            {(
                                (historyToday.length /
                                    (historyToday.length +
                                        pendingActivities.length)) *
                                100
                            ).toFixed(0)}
                            %
                        </h3>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
                <div className="col-span-3 flex max-h-64 w-full flex-col gap-3 rounded-md bg-neutral-900 p-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">Histórico de hoje</h2>
                        <button className="flex rounded-md bg-neutral-950/60 px-4 py-2 hover:bg-neutral-950/40">
                            Ver histórico completo
                        </button>
                    </div>
                    <div className="overflow-y-scroll">
                        <table className="w-full rounded-md bg-neutral-800 p-4">
                            <thead>
                                <tr>
                                    {header_table.map((item) => {
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
                                {historyToday.map(
                                    (item: PerformedActivity, idx) => {
                                        return (
                                            <tr
                                                key={idx}
                                                className="overflow-y-auto border-t border-neutral-700"
                                            >
                                                <td className="py-2 pl-4 text-start text-neutral-400">
                                                    {item.activity.toString() +
                                                        " TODO: ajustar no back"}
                                                </td>
                                                <td className="py-2 pl-4 text-start text-neutral-400">
                                                    {item.effort_perception}
                                                </td>
                                                <td className="py-2 pl-4 text-start text-neutral-400">
                                                    TODO: ajustar no back
                                                </td>
                                                <td className="py-2 pl-4 text-start text-neutral-400">
                                                    TODO: ajustar no back
                                                </td>

                                                <td className="py-2 pl-4 text-start">
                                                    <button
                                                        onClick={() =>
                                                            undoActivity(
                                                                item.id
                                                            )
                                                        }
                                                        className="flex rounded-md bg-neutral-900/50 p-2  hover:text-red-500"
                                                    >
                                                        <ArrowUDownLeft
                                                            size={18}
                                                        />
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
                <div className="flex h-56 w-60 bg-neutral-950 p-3"></div>
            </div>
        </div>
    );
}
