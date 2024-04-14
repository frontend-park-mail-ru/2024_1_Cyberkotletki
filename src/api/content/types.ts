export interface Person {
    id: number;
    firstName: string;
    lastName: string;
}

export interface Movie {
    duration?: number;
    /** @example  '2020-01-01' */
    premiere?: string;
    /** @example  '2020-01-01' */
    release?: string;
}

export interface Episode {
    episodeNumber: number;
    id: number;
    title: string;
}

export interface Season {
    episodes: Episode[];
    id: 1;
    yearEnd: 2020;
    yearStart: 2020;
}

export interface Series {
    seasons?: Season[];
    yearEnd?: number;
    yearStart?: number;
}

export interface Film {
    id: number;
    actors?: Person[];
    ageRestriction?: number;
    audience?: number;
    boxOffice?: number;
    budget?: number;
    composers?: Person[];
    countries?: string[];
    description?: string;
    directors?: Person[];
    editors?: Person[];
    genres?: string[];
    imdbRating?: number;
    marketing?: number;
    movie?: Movie;
    operators?: Person[];
    originalTitle?: string;
    posterURL?: string;
    producers?: Person[];
    rating?: number;
    series?: Series;
    slogan?: string;
    title?: string;
    type?: 'movie' | 'series';
    writers?: Person[];
}

export interface ActorRole
    extends Pick<
        Film,
        'id' | 'actors' | 'originalTitle' | 'rating' | 'title' | 'type'
    > {
    country: string;
    director: string;
    genre: string;
    poster: string;
    releaseYear: number;
}

export interface PersonActor {
    id: number;
    firstName: string;
    lastName: string;
    sex: string;
    photoURL: string;
    height: number;
    /** `1956-07-09T00:00:00Z` */
    birthDate: string;
    /** `1956-07-09T00:00:00Z` */
    deathDate: string;
    /** `1956-07-09T00:00:00Z` */
    endCareer: string;
    /** `1956-07-09T00:00:00Z` */
    startCareer: string;
    roles: ActorRole[];
}
