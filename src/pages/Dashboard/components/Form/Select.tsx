"use client";
import { CaretDown, Check } from "@phosphor-icons/react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ReactNode } from "react";

export interface SelectProps extends SelectPrimitive.SelectProps {
    children: ReactNode;
    placeholder: string;
}

export function Select({ children, placeholder, ...props }: SelectProps) {
    return (
        <SelectPrimitive.Root {...props}>
            <SelectPrimitive.Trigger className="mt-1 flex w-full justify-between rounded-md border border-neutral-500 bg-transparent p-1">
                <SelectPrimitive.Value placeholder={placeholder} />
                <SelectPrimitive.Icon>
                    <CaretDown className="h-4 w-4 text-neutral-500" />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>

            <SelectPrimitive.Portal>
                <SelectPrimitive.Content
                    side="bottom"
                    position="popper"
                    sideOffset={4}
                    className="w-[--radix-select-trigger-width] rounded-md border border-neutral-500 bg-neutral-900 p-1"
                >
                    <SelectPrimitive.Viewport>
                        {children}
                    </SelectPrimitive.Viewport>
                </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
    );
}

type SelectItemProps = SelectPrimitive.SelectItemProps & {
    text: string;
};

export function SelectItem({ text, ...props }: SelectItemProps) {
    return (
        <SelectPrimitive.Item
            className="flex items-center justify-between gap-2 px-3 py-2.5 outline-none data-[highlighted]:bg-neutral-700"
            {...props}
        >
            <SelectPrimitive.ItemText asChild>
                <span className="text-neutral-100">{text}</span>
            </SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator>
                <Check className="h-4 w-4 text-blue-300" />
            </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
    );
}
