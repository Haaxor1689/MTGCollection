import React from "react";

type Props = {
    onImport: (value: string) => void;
}

export const ImportCards = ({ onImport }: Props) => {
    const [value, setValue] = React.useState<string>("");

    return (
        <div>
            <textarea value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={() => onImport(value)}>Import collection</button>
        </div>
    );
};
