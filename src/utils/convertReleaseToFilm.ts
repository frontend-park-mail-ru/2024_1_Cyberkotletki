import type { Film, Release } from '@/api/content/types';

export const convertReleaseToFilm = ({
    poster,
    genre,
    releaseDate,
    ...release
}: Release): Film => ({
    ...release,
    posterURL: poster,
    genres: genre,
    movie: { release: releaseDate },
});
