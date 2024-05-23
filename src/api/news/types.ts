export interface News {
    id?: number;
    title?: string;
    text?: string;
    date?: string;
    pictureURL?: string;
}

export interface NewsResponse {
    news?: News[];
}
