import { useNavigate } from 'react-router-dom';
import { Typography, IconButton } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';

import { ScryCard } from 'utils/types';

const CardDetail = (card: ScryCard) => {
	const navigate = useNavigate();
	return (
		<>
			<Typography
				variant="h2"
				sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
			>
				<IconButton size="large" onClick={() => navigate(-1)}>
					<KeyboardArrowLeft color="primary" />
				</IconButton>
				{card.name}
			</Typography>
			<pre>{JSON.stringify(card, null, 2)}</pre>
		</>
	);
};

export default CardDetail;
