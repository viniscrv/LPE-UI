export function Home() {
    return (
        <div className="flex gap-6">
            <div className="flex h-52 gap-3 rounded-md bg-neutral-900 p-3">
                {[1, 2, 3, 4].map((item) => {
                    return (
                        <div
                            key={item}
                            className="flex h-full w-36 flex-col rounded-md bg-neutral-800 p-2"
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
            <div className="flex h-52 gap-3 rounded-md bg-neutral-900 p-3">
                <div className="flex h-full w-44 flex-col items-center justify-center rounded-md bg-neutral-800 p-2">
                    <div className="rounded-full w-min border-4 border-blue-500 p-8">
                        <h3 className="text-lg font-bold">75%</h3>
                    </div>
                    <span className="mt-4 text-sm text-neutral-100">
                        Lorem ipsum...
                    </span>
                </div>
            </div>
        </div>
    );
}
