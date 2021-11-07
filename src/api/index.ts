import ky from 'ky';

const api = ky.create({
	prefixUrl: 'https://api.scryfall.com/'
});

export default api;
