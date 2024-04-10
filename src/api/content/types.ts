export interface Person {
    firstName: string;
    id: number;
    lastName: string;
}

export interface Movie {
    duration: number;
    /** @example  '2020-01-01' */
    premiere: string;
    /** @example  '2020-01-01' */
    release: string;
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
    ageRestriction: number;
    audience: number;
    boxOffice: number;
    budget: number;
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
    series: Series;
    slogan?: string;
    title?: string;
    type?: 'movie' | 'series';
    writers?: Person[];
}
