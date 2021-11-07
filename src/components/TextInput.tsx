import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'react-final-form';

type Props = {
	id: string;
} & Omit<TextFieldProps, 'value' | 'onChange' | 'onBlur' | 'error'>;

const TextInput = ({ id, helperText, ...props }: Props) => {
	const { input, meta } = useField(id, {
		subscription: { value: true, touched: true, error: true }
	});
	const hasError = meta.touched && meta.error;
	return (
		<TextField
			{...props}
			{...input}
			helperText={hasError ? meta.error : helperText}
			error={hasError}
		/>
	);
};

export default TextInput;
