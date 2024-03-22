class FilmsRoutes {
    /**
     * @param {string} genre Жанр
     * @returns {string} `/collections/compilation/${genre}`
     */
    collectionsByGenre = (genre) => `/collections/compilation/${genre}`;

    /**
     * @param {string} id Id
     * @returns {string} `/content/contentPreview?id=id`
     */
    contentPreview = (id) =>
        `/content/contentPreview?${new URLSearchParams({
            id,
        })}`;
}

export const filmsRoutes = new FilmsRoutes();
