import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import {
    ArrowsInLineHorizontal,
    Fire,
    Medal,
    Percent
} from "@phosphor-icons/react";
import { Activity } from "../../@types/interfaces";
import { ResponsiveCalendar } from "@nivo/calendar";
// import calendarDataMock from "../mock/calendar_data.json";
import { Link } from "react-router-dom";
import { DashboardContext } from "../../contexts/DashboardContext";

export function Statistics() {
    interface MorePerformedActivity {
        activity: Activity;
        count: number;
        percentage: number;
    }

    interface BestStreakActivity {
        activity: Activity;
        streak: number;
        since: Date;
    }

    interface EdgeDifficultyActivities {
        highest: {
            activity: Activity;
            average_effort: Number;
        };
        lowest: {
            activity: Activity;
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
        percentage_progress: number;
    }

    interface dayData {
        day: string;
        value: number;
    }

    interface Achievements {
        id: number;
        activity: Activity;
        profile: number;
        type: string;
        created_at: Date;
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

    const [heatMap, setHeatMap] = useState<dayData[] | []>([]);

    const [recentAchievements, setRecentAchievements] = useState<
        Achievements[] | []
    >([]);

    const { setDashboardPageTitle } = useContext(DashboardContext);

    useEffect(() => {
        getMorePerformedActivity();
        getBestStreakActivity();
        getEdgeDifficultyActivities();
        getCurrentHabits();
        getHabitFormationProgress();
        getRecentAchievements();
        getHeatMap();

        setDashboardPageTitle("Estatistícas da conta");
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

    async function getHeatMap() {
        try {
            const { data } = await api.get("/reports/heat_map/");

            setHeatMap(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function getRecentAchievements() {
        try {
            const { data } = await api.get("/achievements/");

            setRecentAchievements(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    // const calendarData = calendarDataMock;

    const currentYear = new Date().getFullYear();

    return (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-4">
            <div className="flex flex-col gap-4 md:col-span-3">
                <div className="flex flex-col gap-6 md:grid md:h-64 md:grid-cols-3">
                    {/* more performed acitivity */}
                    <div className="gap-3 rounded-md bg-neutral-900 p-3">
                        <h2 className="text-lg font-bold">
                            Atividade mais performada
                        </h2>
                        {morePerformedActivity ? (
                            <div className="relative flex h-52 w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                                <h3 className="flex items-center gap-2 text-xl font-bold">
                                    {morePerformedActivity?.activity.name}{" "}
                                    <Medal size={24} />
                                </h3>
                                <p className="mt-4">
                                    Atividade{" "}
                                    <span className="font-semibold text-blue-300">
                                        {morePerformedActivity?.activity.name}
                                    </span>{" "}
                                    foi completada{" "}
                                    <span className="font-semibold text-blue-300">
                                        {morePerformedActivity?.count}
                                    </span>{" "}
                                    vezes no total
                                </p>
                                <p className="mt-2 text-sm text-neutral-400">
                                    <span className="font-semibold text-blue-300">
                                        {morePerformedActivity.percentage.toFixed(
                                            0
                                        )}
                                        %
                                    </span>{" "}
                                    a mais que outras
                                </p>
                            </div>
                        ) : (
                            <div className="relative flex h-52 w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                                <div className="text-center text-neutral-300">
                                    Nenhuma atividade foi completada. Começe a
                                    completar suas atividades
                                    <Link
                                        to={"/dashboard/today"}
                                        className="cursor-pointer font-semibold text-blue-300"
                                    >
                                        {" "}
                                        hoje
                                    </Link>
                                    .
                                </div>
                                <span className="mt-2">
                                    <Medal size={24} />
                                </span>
                            </div>
                        )}
                    </div>

                    {/* best streak acitivty */}
                    <div className="gap-3 rounded-md bg-neutral-900 p-3">
                        <h2 className="text-lg font-bold">
                            Atividade com a melhor sequência
                        </h2>
                        {bestStreakActivity ? (
                            <div className="relative flex h-52 w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                                <h3 className="flex items-center gap-2 text-xl font-bold">
                                    {bestStreakActivity?.activity.name}{" "}
                                    <Fire size={24} />
                                </h3>
                                <p className="mt-4">
                                    Atividade{" "}
                                    <span className="font-semibold text-blue-300">
                                        {morePerformedActivity?.activity.name}
                                    </span>{" "}
                                    foi completada{" "}
                                    <span className="font-semibold text-blue-300">
                                        {bestStreakActivity?.streak}
                                    </span>{" "}
                                    vezes em sequência desde{" "}
                                    <span className="font-semibold text-blue-300">
                                        {bestStreakActivity.since.toString()}
                                    </span>
                                </p>
                            </div>
                        ) : (
                            <div className="relative flex h-52 w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                                <div className="text-neutral-300">
                                    Nenhuma sequência até o momento. Começe a
                                    completar suas atividades todos os dias e a
                                    melhor aparecerá aqui.
                                </div>

                                <span className="mt-2">
                                    <Fire size={24} />
                                </span>
                            </div>
                        )}
                    </div>

                    {/* more easy x more difficult */}
                    <div className="gap-3 rounded-md bg-neutral-900 p-3">
                        <h2 className="text-lg font-bold">Fácil | Difícil</h2>

                        {edgeDifficultyActivities ? (
                            <div className="relative flex h-52 w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                                <div className="borde flex h-full items-center py-6">
                                    <div className="pl-6 text-left">
                                        <h3>Mais fácil</h3>
                                        <p className="my-1 font-semibold">
                                            {
                                                edgeDifficultyActivities
                                                    ?.highest.activity.name
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
                        ) : (
                            <div className="relative flex h-52 w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                                <div className="text-neutral-300">
                                    Complete atividades para exibir as
                                    atividades mais facéis e mais dificeis para
                                    você com base na sua percepção de esforço
                                </div>
                                <span className="mt-2">
                                    <ArrowsInLineHorizontal size={24} />
                                </span>
                            </div>
                        )}
                    </div>
                    {/* <div className="flex bg-neutral-950 p-3"></div> */}
                </div>

                <div className="flex h-64 flex-col gap-6 md:grid md:grid-cols-3">
                    {/* current habits */}
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
                                                    consectetur adipisicing
                                                    elit.
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
                            <h1 className="text-neutral-400">
                                Quando você tiver hábitos formados, eles
                                aparecerão aqui.
                            </h1>
                        )}
                    </div>

                    {/* habit formation progress */}
                    <div className="flex flex-col gap-3 rounded-md bg-neutral-900 p-3 ">
                        <h2 className="text-lg font-bold">
                            Formação de novos hábitos
                        </h2>
                        {habitFormationProgress.length > 0 ? (
                            <div className="relative flex  h-full w-full flex-col justify-around gap-2 rounded-md bg-neutral-800 p-2">
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
                                                    {item.percentage_progress.toFixed(
                                                        0
                                                    )}
                                                    %
                                                </span>
                                            </div>
                                            <div className="h-2 w-full rounded-md border border-neutral-700">
                                                <div
                                                    style={{
                                                        width: `${item.percentage_progress.toFixed(0)}%`
                                                    }}
                                                    className={`h-full rounded-md bg-blue-400`}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                                <div className="text-neutral-300">
                                    Complete atividades em sequência e veja o
                                    progresso de cada uma delas até se tornarem
                                    um hábito.
                                </div>
                                <span className="mt-2">
                                    <Percent size={24} />
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                {/* heat map */}
                <div className="hidden h-64 gap-6 md:grid md:grid-cols-3">
                    <div className="flex h-64 flex-col gap-3 rounded-md bg-neutral-900 p-3 md:col-span-3">
                        <h2 className="text-lg font-bold">
                            Atividades realizadas este ano
                        </h2>
                        <div className="flex h-full items-center rounded-md bg-neutral-800">
                            <div className="h-40 w-full">
                                {heatMap.length > 0 && (
                                    <ResponsiveCalendar
                                        data={heatMap}
                                        from={`${currentYear}-01-02`}
                                        to={`${currentYear}-12-31`}
                                        theme={{
                                            tooltip: {
                                                container: {
                                                    background: "#171717",
                                                    color: "#e5e5e5",
                                                    fontSize: 14
                                                }
                                            }
                                        }}
                                        colors={[
                                            // "#1e40af",
                                            "#262626",
                                            "#1d4ed8",
                                            "#2563eb",
                                            "#3b82f6"
                                        ]}
                                        dayBorderWidth={2}
                                        monthBorderWidth={1}
                                        daySpacing={2}
                                        monthBorderColor="#171717"
                                        dayBorderColor="#171717"
                                        emptyColor="#262626"
                                        monthLegendOffset={5}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 h-full flex-col rounded-md bg-neutral-900 p-3 md:mt-0 md:flex">
                <h2 className="text-lg font-bold">Conquistas recentes</h2>

                <div className="mt-3 w-full rounded-md bg-neutral-800 py-4">
                    {recentAchievements.map((achievement) => {
                        return (
                            <div
                                key={achievement.id}
                                className="border border-transparent border-b-neutral-700 px-2 pb-3 pt-2"
                            >
                                {achievement.type == "new_easier_activity" && (
                                    <>
                                        <p className="mb-1 text-sm text-neutral-400">
                                            {achievement.created_at.toString()}
                                        </p>
                                        <p>
                                            <span className="font-bold">
                                                {achievement.activity.name}
                                            </span>{" "}
                                            é a nova atividade mais fácil de
                                            executar
                                        </p>
                                    </>
                                )}
                                {achievement.type == "new_harder_activity" && (
                                    <>
                                        <p className="mb-1 text-sm text-neutral-400">
                                            {achievement.created_at.toString()}
                                        </p>
                                        <p>
                                            <span className="font-bold">
                                                {achievement.activity.name}
                                            </span>{" "}
                                            é a nova atividade mais difícil de
                                            executar
                                        </p>
                                    </>
                                )}
                                {achievement.type == "new_best_streak" && (
                                    <>
                                        <p className="mb-1 text-sm text-neutral-400">
                                            {achievement.created_at.toString()}
                                        </p>
                                        <p>
                                            <span className="font-bold">
                                                {achievement.activity.name}
                                            </span>{" "}
                                            é a nova atividade com maior
                                            sequência
                                        </p>
                                    </>
                                )}
                                {achievement.type == "new_more_performed" && (
                                    <>
                                        <p className="mb-1 text-sm text-neutral-400">
                                            {achievement.created_at.toString()}
                                        </p>
                                        <p>
                                            <span className="font-bold">
                                                {achievement.activity.name}
                                            </span>{" "}
                                            é a nova atividade mais executada
                                        </p>
                                    </>
                                )}
                                {achievement.type == "new_habit" && (
                                    <>
                                        <p className="mb-1 text-sm text-neutral-400">
                                            {achievement.created_at.toString()}
                                        </p>
                                        <p>
                                            <span className="font-bold">
                                                {achievement.activity.name}
                                            </span>{" "}
                                            se tornou um novo hábito
                                        </p>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
