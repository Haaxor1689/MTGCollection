import { useSearchParams } from 'react-router-dom';

import SearchInput from 'components/SearchInput';
import SearchResults from 'components/SearchResults';
import usePageTitle from 'hooks/usePageTitle';

const Home = () => {
	usePageTitle('Search');

	const [params] = useSearchParams();
	const query = params.get('q');
	return (
		<>
			<SearchInput />
			{query && <SearchResults query={query} />}
		</>
	);
};

export default Home;
