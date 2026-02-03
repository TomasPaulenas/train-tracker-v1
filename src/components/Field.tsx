
type FieldProps = {
    label?: string;
    type: "text" | "number";
    value: string | number;
    onChange: (value: string) => void;
};

export function Field(props: FieldProps) {
    return (
        <label>
            {props.label && <div>{props.label}</div>}

            <input
                type={props.type}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </label>
    );
}
