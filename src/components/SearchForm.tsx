import { FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchForm = () => {
	const [params, setParams] = useSearchParams();

	// State
	const [query, setQuery] = useState(params.get('q') ?? '');

	// Handlers
	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		setParams({ q: query });
	};

	return (
		<Box component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
			<TextField
				id="query"
				label="Search"
				fullWidth
				variant="standard"
				value={query}
				onChange={e => setQuery(e.target.value)}
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
	);
};

export default SearchForm;
