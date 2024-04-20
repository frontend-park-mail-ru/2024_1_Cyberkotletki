export interface CreateReviewBody {
    contentID: number;
    rating: number;
    text: string;
    title: string;
}

export interface UpdateReviewBody extends Omit<CreateReviewBody, 'contentID'> {
    reviewID: number;
}

export interface ReviewDetails {
    authorAvatar: string;
    authorID: number;
    authorName: string;
    contentID: number;
    contentName: string;
    /** `2022-01-02T15:04:05Z` */
    createdAt: string;
    dislikes: number;
    id: number;
    likes: number;
    rating: number;
    text: string;
    title: string;
}
