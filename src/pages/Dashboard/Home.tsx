import { ArrowUDownLeft } from "@phosphor-icons/react";

export function Home() {
    const mock_table = {
        activity_01: {
            activity_name: "activity_name_01",
            effort_perception: "effort_perception_01",
            activity_group: "activity_group_01",
            until: "until_01"
        },
        activity_02: {
            activity_name: "activity_name_02",
            effort_perception: "effort_perception_02",
            activity_group: "activity_group_02",
            until: "until_02"
        },
        activity_03: {
            activity_name: "activity_name_03",
            effort_perception: "effort_perception_03",
            activity_group: "activity_group_03",
            until: "until_03"
        },
        activity_04: {
            activity_name: "activity_name_04",
            effort_perception: "effort_perception_04",
            activity_group: "activity_group_04",
            until: "until_04"
        },
        activity_05: {
            activity_name: "activity_name_05",
            effort_perception: "effort_perception_05",
            activity_group: "activity_group_05",
            until: "until_05"
        }
    };

    const header_table = [
        "activity name",
        "effort perception",
        "activity group",
        "until",
        "undo"
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between gap-6">
                <div className="flex h-64 w-full gap-3 rounded-md bg-neutral-900 p-3">
                    {[1, 2, 3, 4].map((item) => {
                        return (
                            <div
                                key={item}
                                className="flex h-full w-44 flex-col rounded-md bg-neutral-800 p-2"
                            >
                                <div className="w-full flex-1">
                                    <h3 className="text-lg font-bold">
                                        activity name
                                    </h3>
                                    <p className="mt-2 text-sm text-neutral-400">
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit.
                                    </p>
                                </div>

                                <button className="mt-2 h-8 w-full self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400">
                                    Completar
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="flex h-56 w-60 gap-3 rounded-md bg-neutral-900 p-3">
                    <div className="flex h-full w-full  flex-col items-center justify-center rounded-md bg-neutral-800 p-2">
                        <div className="w-min rounded-full border-4 border-blue-500 p-8">
                            <h3 className="text-lg font-bold">75%</h3>
                        </div>
                        <span className="mt-4 text-sm text-neutral-100">
                            Lorem ipsum...
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between gap-6">
                <div className="flex max-h-64 w-full flex-col gap-3 rounded-md bg-neutral-900 p-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">Histórico de hoje</h2>
                        <button className="flex rounded-md bg-neutral-950/60 px-4 py-2  hover:bg-neutral-950/40">
                            Ver histórico completo
                        </button>
                    </div>
                    <div className="overflow-y-scroll">
                        <table className="w-full rounded-md bg-neutral-800 p-4">
                            <thead>
                                {header_table.map((item) => {
                                    return (
                                        <th
                                            key={item}
                                            className="pl-4 py-2 text-start"
                                        >
                                            {item}
                                        </th>
                                    );
                                })}
                            </thead>
                            <tbody>
                                {Object.values(mock_table).map((item, idx) => {
                                    return (
                                        <tr
                                            key={idx}
                                            className="overflow-y-auto border-t border-neutral-700"
                                        >
                                            <td className="pl-4 py-2 text-start text-neutral-400">
                                                {item.activity_name}
                                            </td>
                                            <td className="pl-4 py-2 text-start text-neutral-400">
                                                {item.activity_group}
                                            </td>
                                            <td className="pl-4 py-2 text-start text-neutral-400">
                                                {item.effort_perception}
                                            </td>
                                            <td className="pl-4 py-2 text-start text-neutral-400">
                                                {item.until}
                                            </td>

                                            <td className="pl-4 py-2 text-start">
                                                <button className="flex rounded-md bg-neutral-900/50 p-2  hover:text-red-500">
                                                    <ArrowUDownLeft size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex h-56 w-60 bg-neutral-950 p-3"></div>
            </div>
        </div>
    );
}
