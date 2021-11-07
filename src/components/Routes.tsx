import { useRoutes } from 'react-router-dom';

import Layout from 'components/Layout';
import Home from 'pages/Home';
import Card from 'pages/Card';

const Routes = () =>
	useRoutes([
		{
			path: '/',
			element: <Layout />,
			children: [
				{ index: true, element: <Home /> },
				{ path: 'card/:id', element: <Card /> }
			]
		}
	]);

export default Routes;
