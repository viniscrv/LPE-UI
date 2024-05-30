import { ArrowUDownLeft, PencilSimple, Trash } from "@phosphor-icons/react";

interface GenericTableProps {
    header: string[];
    fields: string[];
    data: Record<string, any>[]; // cara de gambi, objetivo de aceitar objetos de tipos desconhecidos
    editAction?: boolean;
    deleteAction?: boolean;
    undoAction?: boolean;

    editItem?: (itemId: number) => void;
    deleteItem?: (itemId: number) => void;
    undoItem?: (itemId: number) => void;
}

export function GenericTable({
    header,
    fields,
    data,
    editAction,
    deleteAction,
    undoAction,
    editItem,
    deleteItem,
    undoItem
}: GenericTableProps) {
    return (
        <table className="w-full rounded-md bg-neutral-800 p-4">
            <thead>
                <tr>
                    {header.map((item) => {
                        return (
                            <th key={item} className="py-2 pl-4 text-start">
                                {item}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((item, idx) => {
                    return (
                        <tr
                            key={idx}
                            className="overflow-y-auto border-t border-t-neutral-700"
                        >
                            {fields.map((field, fieldIdx) => (
                                <td
                                    key={fieldIdx}
                                    className="py-2 pl-4 text-start text-neutral-400"
                                >
                                    {item[field]
                                        ? item[field].toString()
                                        : "TODO: Ajustar no back"}
                                </td>
                            ))}

                            {(editAction || deleteAction || undoAction) && (
                                <td className="flex gap-2 py-2 pl-4">
                                    {editAction && editItem && (
                                        <button
                                            onClick={() => editItem(item.id)}
                                            className="flex rounded-md bg-neutral-900/50 p-2  hover:text-blue-500"
                                        >
                                            <PencilSimple size={18} />
                                        </button>
                                    )}
                                    {deleteAction && deleteItem && (
                                        <button
                                            onClick={() => deleteItem(item.id)}
                                            className="flex rounded-md bg-neutral-900/50 p-2  hover:text-red-500"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    )}
                                    {undoAction && undoItem && (
                                        <button
                                            onClick={() => undoItem(item.id)}
                                            className="flex rounded-md bg-neutral-900/50 p-2  hover:text-red-500"
                                        >
                                            <ArrowUDownLeft size={18} />
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
