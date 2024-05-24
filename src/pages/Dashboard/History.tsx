export function History() {
    const header_table_activities = [
        "activity name",
        "activity group",
        "recurrence",
        "until",
        "created_at",
        "actions"
    ];

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
                                <tr className="overflow-y-auto border-t border-neutral-700">
                                    <td className="py-2 pl-4 text-start text-neutral-400"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex bg-neutral-950 p-3"></div>
            </div>
        </div>
    );
}
