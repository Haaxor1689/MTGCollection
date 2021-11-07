import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';

import { useCardById } from 'api/cardsApi';
import CardDetail from 'components/CardDetail';

const Card = () => {
	const { id } = useParams();
	const result = useCardById(id ?? '');

	if (result.isError) {
		return (
			<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
				<Typography color="error" variant="h4" textAlign="center">
					{result.error.details}
				</Typography>
			</Box>
		);
	}

	if (result.isLoading || !result.data) {
		return (
			<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
				<CircularProgress />
			</Box>
		);
	}

	return <CardDetail {...result.data} />;
};

export default Card;
