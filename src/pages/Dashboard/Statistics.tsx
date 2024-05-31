import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { Fire, Medal } from "@phosphor-icons/react";
import { Activity } from "../../@types/interfaces";

export function Statistics() {
    interface MorePerformedActivity {
        activity: Activity;
        count: number;
    }

    interface BestStreakActivity {
        activity: Activity;
        streak: number;
    }

    interface EdgeDifficultyActivities {
        highest: {
            activity: Activity;
            average_effort: Number;
        };
        lowest: {
            activity: {
                activity_group: string;
                created_at: string;
                id: number;
                name: string;
                profile: number;
                recurrence: string;
                until: string;
                updated_at: string;
            };
            average_effort: Number;
        };
    }

    interface CurrentHabits {
        activity_group: string;
        created_at: string;
        id: number;
        name: string;
        profile: number;
        recurrence: string;
        until: string;
        updated_at: string;
    }

    interface HabitFormationProgress {
        activity: Activity;
        streak: number;
        previous_date: string;
        last_report: string;
        days_until_habit: string;
    }

    const [morePerformedActivity, setMorePerformedActivity] =
        useState<MorePerformedActivity | null>();

    const [bestStreakActivity, setBestStreakActivity] =
        useState<BestStreakActivity | null>();

    const [edgeDifficultyActivities, setEdgeDifficultyActivities] =
        useState<EdgeDifficultyActivities | null>();

    const [currentHabits, setCurrentHabits] = useState<CurrentHabits[] | []>(
        []
    );

    const [habitFormationProgress, setHabitFormationProgress] = useState<
        HabitFormationProgress[] | []
    >([]);

    useEffect(() => {
        getMorePerformedActivity();
        getBestStreakActivity();
        getEdgeDifficultyActivities();
        getCurrentHabits();
        getHabitFormationProgress();
    }, []);

    async function getMorePerformedActivity() {
        try {
            const { data } = await api.get("/reports/most_performed_activity/");

            setMorePerformedActivity(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function getBestStreakActivity() {
        try {
            const { data } = await api.get("/reports/best_streak/");

            setBestStreakActivity(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function getEdgeDifficultyActivities() {
        try {
            const { data } = await api.get(
                "/reports/edges_difficulty_activities_to_perform/"
            );

            setEdgeDifficultyActivities(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function getCurrentHabits() {
        try {
            const { data } = await api.get("/reports/current_habits/");

            setCurrentHabits(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function getHabitFormationProgress() {
        try {
            const { data } = await api.get(
                "/reports/habit_formation_progress/"
            );

            setHabitFormationProgress(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="grid h-64 grid-cols-4 gap-6">
                {/* more performed acitivity */}
                <div className="flex flex-col gap-3 rounded-md bg-neutral-900 p-3 ">
                    <h2 className="text-lg font-bold">
                        Atividade mais performada
                    </h2>
                    <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                        <h3 className="flex items-center gap-2 text-xl font-bold">
                            {morePerformedActivity?.activity.name}{" "}
                            <Medal size={24} />
                        </h3>
                        <p className="mt-4">
                            Atividade "{morePerformedActivity?.activity.name}"
                            foi completada{" "}
                            <span className="text-lg font-semibold text-blue-300">
                                {morePerformedActivity?.count}
                            </span>{" "}
                            vezes no total
                        </p>
                        <p className="mt-2 text-sm">"x%" a mais que outras</p>
                    </div>
                </div>

                {/* best streak acitivty */}
                <div className="flex flex-col gap-3 rounded-md bg-neutral-900 p-3 ">
                    <h2 className="text-lg font-bold">
                        Atividade com a melhor sequência
                    </h2>
                    <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                        <h3 className="flex items-center gap-2 text-xl font-bold">
                            {bestStreakActivity?.activity.name}{" "}
                            <Fire size={24} />
                        </h3>
                        <p className="mt-4">
                            Atividade "{morePerformedActivity?.activity.name}"
                            foi completada{" "}
                            <span className="text-lg font-semibold text-blue-300">
                                {bestStreakActivity?.streak}
                            </span>{" "}
                            vezes em sequência desde "01/01/2000"
                        </p>
                    </div>
                </div>

                {/* more easy x more difficult */}
                <div className="flex flex-col gap-3 rounded-md bg-neutral-900 p-3 ">
                    <h2 className="text-lg font-bold">Fácil | Difícil</h2>
                    <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                        <div className="borde flex h-full items-center py-6">
                            <div className="pl-6 text-left">
                                <h3>Mais fácil</h3>
                                <p className="my-1 font-semibold">
                                    {
                                        edgeDifficultyActivities?.highest
                                            .activity.name
                                    }
                                </p>
                                <p className="text-sm">
                                    Média de percepção de esforço:{" "}
                                    <span className="text-base font-semibold text-blue-300">
                                        {edgeDifficultyActivities?.highest.average_effort
                                            .toFixed(1)
                                            .toString()}
                                    </span>
                                </p>
                            </div>
                            <div className="h-full border border-neutral-700 border-y-transparent border-r-transparent"></div>
                            <div className="pl-6 text-left">
                                <h3>Mais difícil</h3>
                                <p className="my-1 font-semibold">
                                    {
                                        edgeDifficultyActivities?.lowest
                                            .activity.name
                                    }
                                </p>
                                <p className="text-sm">
                                    Média de percepção de esforço:{" "}
                                    <span className="text-base font-semibold text-blue-300">
                                        {edgeDifficultyActivities?.lowest.average_effort
                                            .toFixed(1)
                                            .toString()}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex bg-neutral-950 p-3"></div>
            </div>

            {/* current habits */}
            <div className="grid h-64 grid-cols-4 gap-6">
                <div className="col-span-2 flex h-64 w-full flex-col gap-3 rounded-md bg-neutral-900 p-3">
                    <h2 className="text-lg font-bold">Hábitos atuais</h2>
                    {currentHabits.length > 0 ? (
                        currentHabits.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className="flex h-full w-44 flex-col rounded-md bg-neutral-800 p-2"
                                >
                                    <div className="flex h-full w-full flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold">
                                                {item.name}
                                            </h3>
                                            <p className="mt-2 text-neutral-400">
                                                Lorem, ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                            </p>
                                        </div>

                                        <p className="text-sm">
                                            Hábito criado em "01/01/2000"
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <h1>
                            Quando você tiver hábitos formados, eles aparecerão
                            aqui.
                        </h1>
                    )}
                </div>

                {/* habit formation progress */}
                <div className="flex flex-col gap-3 rounded-md bg-neutral-900 p-3 ">
                    <h2 className="text-lg font-bold">
                        Formação de novos hábitos
                    </h2>
                    <div className="relative flex h-full w-full flex-col items-start gap-3 rounded-md bg-neutral-800 p-4 text-center">
                        {habitFormationProgress.map((item) => {
                            return (
                                <div
                                    key={item.activity.id.toString()}
                                    className="w-full rounded-md border border-neutral-700 p-2 text-start"
                                >
                                    <div className="flex justify-between">
                                        <p className="font-semibold">
                                            {item.activity.name}
                                        </p>
                                        <span className="font-semibold">
                                            75%
                                        </span>
                                    </div>
                                    <div className="mt-1 h-2 rounded-md border border-neutral-700">
                                        <div className="h-full w-2/3 rounded-md bg-blue-400"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
