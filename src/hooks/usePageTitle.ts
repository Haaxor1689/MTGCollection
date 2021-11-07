import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | MTG Collection`;
	}, [title]);
};

export default usePageTitle;
