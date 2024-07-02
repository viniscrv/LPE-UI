import * as ToastRadix from "@radix-ui/react-toast";
import { useContext, useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react";
import { ToastContext } from "../contexts/ToastContext";

export function GenericToast() {
    const [open, setOpen] = useState(false);

    const { stateToast, toastContent } = useContext(ToastContext);
    const { title, description, color } = toastContent;

    const timerRef = useRef(0);

    useEffect(() => {
        if (Object.values(toastContent).length) {
            setOpen(false);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
                setOpen(true);
            }, 100);
        }
    }, [stateToast]);

    return (
        <ToastRadix.Provider swipeDirection="right" duration={30000}>
            <ToastRadix.Root
                className="flex items-center justify-between border border-neutral-500 rounded-md"
                open={open}
                onOpenChange={setOpen}
            >
                <div className="flex px-6 py-2">
                    {/* <div className="block bg-blue-500 w-[2px] mr-4"></div> */}
                    <div>
                        <h4 className="font-semibold">{title}</h4>
                        <span className="text-neutral-400">{description}</span>
                    </div>
                </div>
                <ToastRadix.Action asChild altText="close">
                    <button className="cursor-pointer mr-4">
                        <X size={24} />
                    </button>
                </ToastRadix.Action>
            </ToastRadix.Root>
            <ToastRadix.Viewport className="fixed bottom-0 right-0 min-w-64 min-h-16 max-w-screen z-50 mt-0 ml-0 mr-4 mb-4" />
        </ToastRadix.Provider>
    );
}
