import type { FilmPreview } from '@/api/content/types';

export interface FavouriteBody {
    /** "favourite" */
    category: string;
    contentID: number;
}

export interface FavouriteContent {
    /** "favourite" */
    category?: string;
    content?: FilmPreview;
}

export interface FavouriteResponse {
    favourites?: FavouriteContent[];
}

export interface FavouriteStatus {
    /** "favourite" */
    status?: string;
}
