import type { Film, Release } from '@/api/content/types';

export const convertReleaseToFilm = ({
    poster,
    genre,
    actors,
    country,
    director,
    ...release
}: Release): Film => ({
    ...release,
    directors: director ? [{ name: director }] : [],
    countries: country ? [country] : [],
    actors: actors?.length ? actors.map((name) => ({ name })) : [],
    posterURL: poster,
    genres: genre ? [genre] : [],
});
