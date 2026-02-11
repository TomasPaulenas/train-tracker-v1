import type { ComponentProps, ChangeEvent } from "react";

type Props = {
    value: string | number;
    onChange: (value: string) => void;
} & Omit<ComponentProps<"input">, "value" | "onChange">;

export function Field({ value, onChange, className, ...rest }: Props) {
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value);
    }

    const base =
        "w-full h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 " +
        "placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20";

    const nextClassName = className ? `${base} ${className}` : base;

    return (
        <input
            {...rest}
            value={value}
            onChange={handleChange}
            className={nextClassName}
        />
    );
}
