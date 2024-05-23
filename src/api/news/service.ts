export { newsRoutes } from './routes';


export interface News {
    title: string;
    date: string;
    poster: string;
}

/**
 * Макет новостей
 */
export const newsMock = [
    {
        id: 1,
        title: "Заголовок новости 1",
        text: "Текст новости 1",
        date: "2024-01-01",
        pictureURL: "/src/assets/news/poster1.jpg"
    },
    {
        id: 2,
        title: "Заголовок новости 2",
        text: "Текст новости 2",
        date: "2024-01-02",
        pictureURL: "/src/assets/news/poster2.jpg"
    },
    {
        id: 3,
        title: "Заголовок новости 3, который очень длинный " +
            "и занимает много места, прямо очень много, вообще ужас",
        text: "Текст новости 3",
        date: "2024-01-03",
        pictureURL: "/src/assets/news/poster3.jpg"
    },
];

class NewsService {
    /**
     * Получить список всех новостей
     * @returns {Promise<News[]>} Список новостей
     */
    async getAllNews(): Promise<News[]> {
        console.log('getAllNews');
        const news = newsMock.map(news => ({...news, poster: news.pictureURL}));
        return news.length > 0 ? news : [];
    }

    /**
     * Получить новость по id
     * @param id Идентификатор новости
     * @returns {Promise<News>} Новость
     */
    async getNewsById(id: number): Promise<News> {
        const news = newsMock.find(news => news.id === id);
        return news ? Promise.resolve({...news, poster: news.pictureURL}) : Promise.reject('News not found'); // Added 'poster' property
    }
}

export const newsService = new NewsService();
