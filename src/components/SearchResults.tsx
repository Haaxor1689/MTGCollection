import { Box, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ErrorOutline } from '@mui/icons-material';

import { useCardSearch } from 'api/cardsApi';
import { getCardImage } from 'utils';

type Props = {
	query: string;
};

const SearchResults = ({ query }: Props) => {
	const result = useCardSearch(query);

	if (result.isError) {
		return (
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					alignSelf: 'center',
					flexGrow: 1,
					gap: 2,
					color: 'error.main'
				}}
			>
				<ErrorOutline sx={{ typography: 'h1' }} />
				<Typography variant="h5" textAlign="center">
					{result.error.details}
				</Typography>
			</Box>
		);
	}

	if (result.isLoading || !result.data) {
		return (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					alignSelf: 'center',
					flexGrow: 1
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
				width: '100%',
				gap: 2
			}}
		>
			{result.data.data.map(c => (
				<Box
					key={c.id}
					component={Link}
					to={`/card/${c.id}`}
					sx={{
						'borderRadius': '5%',
						'overflow': 'hidden',
						'filter': 'saturate(50%)',
						':hover': {
							filter: 'saturate(100%)'
						}
					}}
				>
					<Box
						component="img"
						alt={c.name}
						src={getCardImage(c)?.normal}
						sx={{
							width: '100%',
							height: '100%'
						}}
					/>
				</Box>
			))}
		</Box>
	);
};

export default SearchResults;
