import type { Film, SimilarContent } from '@/api/content/types';

export const convertSimilarToFilm = ({
    poster,
    genre,
    ...film
}: SimilarContent): Film => ({
    ...film,
    posterURL: poster,
    genres: genre,
});
