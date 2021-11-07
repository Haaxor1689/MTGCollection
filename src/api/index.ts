import ky from 'ky';

/**
 * Ky wraps the vanilla js `fetch` api and helps us to work with it more effectively. We can create a pre-configured base object that provides some default for all the requests.
 */
const api = ky.create({
	// We can define prefixUrl here since it will be same every time
	prefixUrl: 'https://api.scryfall.com/',
	// Hooks can be used for (pre/post)processing requests
	hooks: {
		afterResponse: [
			async (_request, _options, response) => {
				// Since Scryfall API returns nice error messages, we can throw the parsed json error response instead of generic HTTPError
				if (!response.ok) {
					throw await response.json();
				}
			}
		]
	}
});

export default api;
