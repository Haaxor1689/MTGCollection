import { useSearchParams } from 'react-router-dom';
import { Form } from 'react-final-form';
import { InputAdornment, IconButton, Box } from '@mui/material';
import { Search } from '@mui/icons-material';

import TextInput from './TextInput';

const SearchForm = () => {
	const [params, setParams] = useSearchParams();
	return (
		<Form
			initialValues={{
				query: params.get('q') ?? ''
			}}
			onSubmit={values => {
				setParams({ q: values.query });
			}}
			render={({ handleSubmit }) => (
				<Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
					<TextInput
						id="query"
						label="Search"
						fullWidth
						variant="standard"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton type="submit" size="large">
										<Search />
									</IconButton>
								</InputAdornment>
							),
							sx: { typography: 'h3' }
						}}
					/>
				</Box>
			)}
		/>
	);
};

export default SearchForm;
