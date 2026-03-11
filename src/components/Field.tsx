import type { ChangeEvent, ComponentProps } from "react";

type Props = {
    value: string | number;
    onChange: (value: string) => void;
} & Omit<ComponentProps<"input">, "value" | "onChange">;

export function Field({ value, onChange, className, ...rest }: Props) {
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value);
    }

    const baseClassName =
        "h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 " +
        "placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20";

    const inputClassName = className
        ? `${baseClassName} ${className}`
        : baseClassName;

    return (
        <input
            {...rest}
            value={value}
            onChange={handleChange}
            className={inputClassName}
        />
    );
}