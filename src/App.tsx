import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import theme from 'utils/theme';
import Routes from 'components/Routes';

const App = () => (
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Routes />
		</ThemeProvider>
	</BrowserRouter>
);

export default App;
