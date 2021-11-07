import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';

import { cardById } from 'api/cardsApi';
import { ScryCard, ScryError } from 'utils/types';
import CardDetail from 'components/CardDetail';

const Card = () => {
	const { id } = useParams();

	const [result, setResult] = useState<ScryCard>();
	const [error, setError] = useState<ScryError>();

	useEffect(() => {
		setResult(undefined);
		setError(undefined);

		id && cardById(id).then(setResult).catch(setError);
	}, [id]);

	if (error) {
		return (
			<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
				<Typography color="error" variant="h4" textAlign="center">
					{error.details}
				</Typography>
			</Box>
		);
	}

	if (!result) {
		return (
			<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
				<CircularProgress />
			</Box>
		);
	}

	return <CardDetail {...result} />;
};

export default Card;
