import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import theme from 'utils/theme';
import Routes from 'components/Routes';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			refetchOnWindowFocus: false,
			staleTime: 3600000
		}
	}
});

const App = () => (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes />
				<ReactQueryDevtools />
			</ThemeProvider>
		</BrowserRouter>
	</QueryClientProvider>
);

export default App;
