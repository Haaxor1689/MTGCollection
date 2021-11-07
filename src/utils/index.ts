import { ScryCard } from './types';

export const getCardImage = (card: ScryCard) =>
	card.image_uris ?? card.card_faces?.[0].image_uris;
