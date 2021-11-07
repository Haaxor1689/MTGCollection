export type ScryList<T extends unknown> = {
	/**
	 * An array of the requested objects, in a specific order.
	 */
	data: T[];
	/**
	 * True if this List is paginated and there is a page beyond the current page.
	 */
	has_more: boolean;
	/**
	 * If there is a page beyond the current page, this field will contain a full API URI to that page. You may submit a HTTP `GET` request to that URI to continue paginating forward on this List.
	 */
	next_page?: string;
	/**
	 * If this is a list of Card objects, this field will contain the total number of cards found across all pages.
	 */
	total_cards?: number;
	/**
	 * An array of human-readable warnings issued when generating this list, as strings. Warnings are non-fatal issues that the API discovered with your input. In general, they indicate that the List will not contain the all of the information you requested. You should fix the warnings and re-submit your request.
	 */
	warnings?: string[];
};

export type ScryError = {
	/**
	 * An integer HTTP status code for this error.
	 */
	status: number;
	/**
	 * A computer-friendly string representing the appropriate HTTP status code.
	 */
	code: string;
	/**
	 * A human-readable string explaining the error.
	 */
	details: string;
	/**
	 * A computer-friendly string that provides additional context for the main error. For example, an endpoint many generate HTTP 404 errors for different kinds of input. This field will provide a label for the specific kind of 404 failure, such as ambiguous.
	 */
	type?: string;
	/**
	 * If your input also generated non-failure warnings, they will be provided as human-readable strings in this array.
	 */
	warnings: string[];
};

export type ScryCardSymbol = {
	symbol: string;
	svg_uri: string;
	svg: string;
	loose_variant: string | null;
	english: string;
	represents_mana: boolean;
	cmc: number | null;
};

export type ScryCardIdentifier =
	| {
			id: string;
	  }
	| {
			name: string;
			set?: string;
	  };

export type ScryManaCost = {
	cost: string;
	colors: string[];
	cmc: number;
	colorless: boolean;
	monocolored: boolean;
	multicolored: boolean;
};

export type ScrySet = {
	code: string;
	name: string;
	icon_svg_uri: string;
	icon_svg: string;
};

export type ScryCardRarity = 'common' | 'uncommon' | 'rare' | 'mythic';

export type ScryCardImageUris = Record<
	'small' | 'normal' | 'large' | 'png' | 'art_crop' | 'border_crop',
	string
>;

export type ScryCardLayout =
	| 'normal'
	| 'split'
	| 'flip'
	| 'transform'
	| 'meld'
	| 'leveler'
	| 'saga'
	| 'planar'
	| 'scheme'
	| 'vanguard'
	| 'token'
	| 'double_faced_token'
	| 'emblem'
	| 'augment'
	| 'host';

export type ScryCardColor = 'W' | 'U' | 'B' | 'R' | 'G';

export type ScryCardFace = {
	object: 'card_face';
	artist: string;
	color_indicator: ScryCardColor[];
	colors: ScryCardColor[];
	flavor_text: string;
	image_uris?: ScryCardImageUris;
	oracle_text: string;
};

export type ScryCard = {
	id: string;
	name: string;
	object: 'card';
	layout: ScryCardLayout;
	card_faces: ScryCardFace[] | null;
	color_identity: ScryCardColor[];
	mana_cost: string;
	type_line: string;
	rarity: ScryCardRarity;
	set: string;
	scryfall_uri: string;
	scryfall_set_uri: string;
} & Omit<ScryCardFace, 'object'>;
