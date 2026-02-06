import type { ComponentProps } from "react";

type Props = {
    value: string | number;
    onChange: (value: string) => void;
} & Omit<ComponentProps<"input">, "value" | "onChange">;

export function Field({ value, onChange, ...rest }: Props) {
    return (
        <input
            {...rest}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
