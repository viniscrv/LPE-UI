import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { Fire, Medal } from "@phosphor-icons/react";

export function Statistics() {
    interface MorePerformedActivity {
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
        count: number;
    }

    interface BestStreakActivity {
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
        streak: number;
    }

    interface EdgeDifficultyActivities {
        highest: {
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

    const [morePerformedActivity, setMorePerformedActivity] =
        useState<MorePerformedActivity | null>();

    const [bestStreakActivity, setBestStreakActivity] =
        useState<BestStreakActivity | null>();

    const [edgeDifficultyActivities, setEdgeDifficultyActivities] =
        useState<EdgeDifficultyActivities | null>();

    useEffect(() => {
        getMorePerformedActivity();
        getBestStreakActivity();
        getEdgeDifficultyActivities();
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
                                        {edgeDifficultyActivities?.highest.average_effort.toString()}
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
                                        {edgeDifficultyActivities?.lowest.average_effort.toString()}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
