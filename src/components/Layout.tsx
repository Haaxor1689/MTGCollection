import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => (
	<Container
		maxWidth="lg"
		component="main"
		sx={{
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
			gap: 2,
			p: 4
		}}
	>
		<Outlet />
	</Container>
);
export default Layout;
