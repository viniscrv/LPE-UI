import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
    titleModal: string;
    descriptionModal: string;
    children: ReactNode;
}

export function GenericModal({
    titleModal,
    descriptionModal,
    children
}: ModalProps) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-neutral-950/40" />
            <Dialog.Content className="fixed left-1/2 top-1/2 flex w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-neutral-900 p-5 shadow-md">
                <Dialog.Title>{titleModal}</Dialog.Title>
                <Dialog.Description asChild>
                    <p className="mt-2 text-sm text-neutral-400">
                        {descriptionModal}
                    </p>
                </Dialog.Description>
                {children}
                {/* <Dialog.Close asChild>
                    <button className="mt-4 h-8 w-full justify-self-end rounded-md bg-blue-500 text-neutral-50 hover:bg-blue-400">
                        {buttonConfirmationText}
                    </button>
                </Dialog.Close> */}
            </Dialog.Content>
        </Dialog.Portal>
    );
}
