import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

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

    const [morePerformedActivity, setMorePerformedActivity] =
        useState<MorePerformedActivity | null>();

    useEffect(() => {
        getMorePerformedActivity();
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

    return (
        <div className="flex flex-col gap-6">
            <div className="grid h-64 grid-cols-4 gap-6">
                <div className="flex flex-col gap-3 rounded-md bg-neutral-900 p-3 text-center">
                    <h2 className="text-lg font-bold">
                        Atividade mais performada
                    </h2>
                    <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2">
                        <h3 className="font-bold">
                            {morePerformedActivity?.activity.name}
                        </h3>
                        <p className="mt-4">
                            Atividade "{morePerformedActivity?.activity.name}"
                            foi completada {morePerformedActivity?.count} vezes
                        </p>
                        <p className="mt-2 text-sm">"x%" a mais que outras</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
