import type { Film, FilmPreview } from '@/api/content/types';
import { isDefined } from '@/utils/isDefined';

export const convertPreviewToFilm = ({
    actors,
    poster,
    director,
    duration,
    release,
    genre,
    country,
    ...film
}: FilmPreview): Film => ({
    ...film,
    actors: actors?.map((name) => ({ name })),
    posterURL: poster,
    directors: [{ name: director }],
    genres: [genre].filter(Boolean),
    countries: [country].filter(Boolean),
    movie: {
        release: isDefined(release)
            ? new Date(`${release}`).toISOString()
            : undefined,
        duration,
    },
});
