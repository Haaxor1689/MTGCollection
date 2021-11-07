import { useQuery } from 'react-query';

import api from 'api';
import { ScryCard, ScryError, ScryList } from 'utils/types';
import { queryClient } from 'App';

export const useCardSearch = (query: string) =>
	useQuery<ScryList<ScryCard>, ScryError>(
		['list', 'cards', 'search', { query }],
		() =>
			api.get(`cards/search?order=cmc&q=${query}`).json<ScryList<ScryCard>>(),
		{
			onSuccess: data =>
				data.data.forEach(card => {
					queryClient.setQueryData(['get', 'cards', { id: card.id }], card);
				})
		}
	);

export const useCardById = (id: string) =>
	useQuery<ScryCard, ScryError>(['get', 'cards', { id }], () =>
		api.get(`cards/${id}`).json<ScryCard>()
	);
