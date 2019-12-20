import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Scry from "../../Utility/Scry";

type Props = {
    label: string;
    onNameSelect?: (name: string) => void;
};

const CardNameAutocomplete: React.FC<Props> = ({ label, onNameSelect }) => {
    const [value, setValue] = React.useState<string>("");
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<string[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [typingTimer, setTypingTimer] = React.useState<number | undefined>(undefined);

    const onInputChange = (newValue: string, reason: "input" | "reset") => {
        if (value === newValue || reason === "reset") {
            return;
        }
        setValue(newValue);

        clearTimeout(typingTimer);
        setTypingTimer(
            setTimeout(() => {
                if (newValue.length < 2) {
                    return;
                }
                setIsLoading(true);
                Scry.Cards.Autocomplete(newValue).then(names => {
                    setOptions(names);
                    setIsLoading(false);
                    if (names.length === 1 && names[0].toLowerCase().includes(newValue.toLowerCase())) {
                        setValue(names[0]);
                        onChange(names[0]);
                        setOpen(false);
                    }
                });
            }, 500)
        );
    };

    const onChange = (newValue: string) => {
        setValue(newValue);
        setOptions([]);
        onNameSelect && onNameSelect(newValue);
    };

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            style={{ width: 300 }}
            open={open}
            value={value}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onChange={(e, val) => onChange(val)}
            onInputChange={(e, val, reason) => onInputChange(val, reason)}
            options={options}
            loading={isLoading}
            renderInput={params => (
                <TextField
                    {...params}
                    label={label}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
};
export default CardNameAutocomplete;
