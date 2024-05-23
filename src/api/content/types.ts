export interface Person {
    enName?: string;
    id?: number;
    name?: string;
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
    id?: number;
    actors?: Person[];
    ageRestriction?: number;
    backdropURL?: string;
    budget?: string;
    boxOffice?: number;
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
    facts?: string[];
    picturesURL?: string[];
    trailerLink?: string;
}

export interface FilmPreview {
    actors?: string[];
    country?: string;
    director?: string;
    duration?: number;
    genre?: string;
    id?: number;
    originalTitle?: string;
    poster?: string;
    rating?: number;
    release?: number;
    title?: string;
    type?: Film['type'];
}

export interface ActorRole {
    genre?: string[];
    id?: number;
    poster?: string;
    rating?: number;
    releaseYear?: number;
    title?: string;
    type?: Film['type'];
    yearEnd?: number;
    yearStart?: number;
}

export interface PersonActor {
    id?: number;
    sex?: string;
    photoURL?: string;
    height?: number;
    /** `1956-07-09T00:00:00Z` */
    birthDate?: string;
    /** `1956-07-09T00:00:00Z` */
    deathDate?: string;
    /** `1956-07-09T00:00:00Z` */
    endCareer?: string;
    /** `1956-07-09T00:00:00Z` */
    startCareer?: string;
    roles?: Record<'string', ActorRole[]>;
    enName?: string;
    name?: string;
}

export interface CompilationType {
    id?: number;
    type?: string;
}

export interface CompilationTypesResponse {
    compilation_types?: CompilationType[];
}

export interface Compilation {
    id?: number;
    title?: string;
    compilation_type_id?: number;
    poster?: string;
}

export interface CompilationsResponse {
    compilations?: Compilation[];
}

export interface FilmsCompilation {
    compilation?: Compilation;
    content?: FilmPreview[];
    content_length?: number;
    page?: number;
    per_page?: number;
    total_pages?: number;
}

export interface SearchContent {
    actors?: string[];
    country?: string;
    director?: string;
    duration?: number;
    genre?: string;
    id?: number;
    originalTitle?: string;
    poster?: string;
    rating?: number;
    seasonsNumber?: number;
    title?: string;
    type?: Film['type'];
    yearEnd?: number;
    yearStart?: number;
}

export interface SearchPerson {
    enName?: string;
    id?: number;
    name?: string;
    photoURL?: string;
}

export interface SearchResponse {
    content?: SearchContent[];
    persons?: SearchPerson[];
}

export interface Release {
    genre?: string[];
    id?: number;
    poster?: string;
    /** 2022-01-02T15:04:05Z */
    releaseDate?: string;
    title?: string;
    type?: Film['type'];
}

export interface ReleaseResponse {
    ongoing_content_list?: Release[];
}

export interface ReleaseYearsResponse {
    years?: number[];
}
