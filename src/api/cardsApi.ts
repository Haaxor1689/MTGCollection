import api from 'api';
import { ScryCard, ScryList } from 'utils/types';

export const cardsSearch = (q: string) =>
	api
		.get(`cards/search?order=cmc&q=${q}`)
		.json<ScryList<ScryCard>>()
		.catch(async e => {
			throw await e.response.json();
		});

export const cardById = (id: string) =>
	api
		.get(`cards/${id}`)
		.json<ScryCard>()
		.catch(async e => {
			throw await e.response.json();
		});
