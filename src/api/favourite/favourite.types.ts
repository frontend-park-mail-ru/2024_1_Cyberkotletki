export interface FavouriteBody {
    /** "favourite" */
    category: string;
    contentID: number;
}

export interface FavouriteResponse {
    favourites?: Partial<FavouriteBody>[];
}

export interface FavouriteStatus {
    /** "favourite" */
    status?: string;
}
