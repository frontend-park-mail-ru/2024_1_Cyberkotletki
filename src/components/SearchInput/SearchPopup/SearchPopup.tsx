import styles from './SearchPopup.module.scss';

import type { PopoverProps } from '@/components/Popover/Popover';
import { Popover } from '@/components/Popover';
import { Spinner } from '@/components/Spinner';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';
import { SearchItem } from '@/components/SearchItem';
import type { Film, PersonActor } from '@/api/content/types';

const FILMS: Film[] = [
    {
        id: 1,
        title: 'Зеленая миля',
        originalTitle: 'The Green Mile',
        slogan: 'Пол Эджкомб не верил в чудеса. Пока не столкнулся с одним из них',
        ageRestriction: 18,
        rating: 9.333333333333334,
        imdbRating: 8.6,
        description:
            'Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни. Пол повидал много заключённых и надзирателей за время работы. Однако гигант Джон Коффи, обвинённый в страшном преступлении, стал одним из самых необычных обитателей блока.',
        posterURL: 'posters/435.jpg',
        countries: ['США'],
        genres: ['драма', 'криминал', 'фэнтези'],
        actors: [
            { id: 1, firstName: 'Том', lastName: 'Хэнкс' },
            { id: 2, firstName: 'Дэвид', lastName: 'Морс' },
            { id: 3, firstName: 'Бонни', lastName: 'Хант' },
        ],
        directors: [{ id: 4, firstName: 'Фрэнк', lastName: 'Дарабонт' }],
        producers: [{ id: 4, firstName: 'Фрэнк', lastName: 'Дарабонт' }],
        writers: [
            { id: 5, firstName: 'Стивен', lastName: 'Кинг' },
            { id: 4, firstName: 'Фрэнк', lastName: 'Дарабонт' },
        ],
        operators: [
            {
                id: 6,
                firstName: 'Дэвид',
                lastName: 'Тэттерсолл',
            },
        ],
        composers: [{ id: 7, firstName: 'Томас', lastName: 'Ньюман' }],
        editors: [
            {
                id: 8,
                firstName: 'Ричард',
                lastName: 'Фрэнсис-Брюс',
            },
        ],
        type: 'movie',
        movie: {
            premiere: '1999-01-01T00:00:00Z',
            release: '1999-01-01T00:00:00Z',
            duration: 189,
        },
        series: { yearStart: 0, yearEnd: 0 },
    },
    {
        id: 8,
        title: 'Криминальное чтиво',
        originalTitle: 'Pulp Fiction',
        slogan: "Just because you are a character doesn't mean you have character",
        ageRestriction: 18,
        rating: 9,
        imdbRating: 8.9,
        description:
            'Двое бандитов Винсент Вега и Джулс Винфилд ведут философские беседы в перерывах между разборками и решением проблем с должниками криминального босса Марселласа Уоллеса.\nВ первой истории Винсент проводит незабываемый вечер с женой Марселласа Мией. Во второй рассказывается о боксёре Бутче Кулидже, купленном Уоллесом, чтобы сдать бой. В третьей истории Винсент и Джулс по нелепой случайности попадают в неприятности.',
        posterURL: 'posters/342.jpg',
        countries: ['США'],
        genres: ['драма', 'криминал'],
        actors: [
            { id: 61, firstName: 'Джон', lastName: 'Траволта' },
            { id: 62, firstName: 'Сэмюэл', lastName: 'Л. Джексон' },
            { id: 63, firstName: 'Брюс', lastName: 'Уиллис' },
        ],
        directors: [{ id: 64, firstName: 'Квентин', lastName: 'Тарантино' }],
        producers: [{ id: 65, firstName: 'Лоуренс', lastName: 'Бендер' }],
        writers: [
            { id: 64, firstName: 'Квентин', lastName: 'Тарантино' },
            { id: 66, firstName: 'Роджер', lastName: 'Эвери' },
        ],
        operators: [{ id: 67, firstName: 'Анджей', lastName: 'Секула' }],
        composers: [],
        editors: [{ id: 68, firstName: 'Салли', lastName: 'Менке' }],
        type: 'movie',
        movie: {
            premiere: '1994-01-01T00:00:00Z',
            release: '1994-01-01T00:00:00Z',
            duration: 154,
        },
        series: { yearStart: 0, yearEnd: 0 },
    },
];

const ACTORS = [
    {
        id: 1,
        firstName: 'Том',
        lastName: 'Хэнкс',
        birthDate: '1956-07-09T00:00:00Z',
        deathDate: '0001-01-01T00:00:00Z',
        startCareer: '0001-01-01T00:00:00Z',
        endCareer: '0001-01-01T00:00:00Z',
        sex: 'M',
        photoURL: 'persons/9144.jpg',
        height: 183,
        roles: [
            {
                id: 1,
                title: 'Зеленая миля',
                originalTitle: 'The Green Mile',
                releaseYear: 0,
                country: '',
                genre: '',
                director: '',
                poster: 'posters/435.jpg',
                rating: 0,
            },
            {
                id: 3,
                title: 'Форрест Гамп',
                originalTitle: 'Forrest Gump',
                releaseYear: 0,
                country: '',
                genre: '',
                director: '',
                poster: 'posters/448.jpg',
                rating: 0,
            },
            {
                id: 26,
                title: 'Поймай меня, если сможешь',
                originalTitle: 'Catch Me If You Can',
                releaseYear: 0,
                country: '',
                genre: '',
                director: '',
                poster: 'posters/324.jpg',
                rating: 0,
            },
        ],
    },
    {
        id: 1,
        firstName: 'Том',
        lastName: 'Хэнкс',
        birthDate: '1956-07-09T00:00:00Z',
        deathDate: '0001-01-01T00:00:00Z',
        startCareer: '0001-01-01T00:00:00Z',
        endCareer: '0001-01-01T00:00:00Z',
        sex: 'M',
        photoURL: 'persons/9144.jpg',
        height: 183,
        roles: [
            {
                id: 1,
                title: 'Зеленая миля',
                originalTitle: 'The Green Mile',
                releaseYear: 0,
                country: '',
                genre: '',
                director: '',
                poster: 'posters/435.jpg',
                rating: 0,
            },
            {
                id: 3,
                title: 'Форрест Гамп',
                originalTitle: 'Forrest Gump',
                releaseYear: 0,
                country: '',
                genre: '',
                director: '',
                poster: 'posters/448.jpg',
                rating: 0,
            },
            {
                id: 26,
                title: 'Поймай меня, если сможешь',
                originalTitle: 'Catch Me If You Can',
                releaseYear: 0,
                country: '',
                genre: '',
                director: '',
                poster: 'posters/324.jpg',
                rating: 0,
            },
        ],
    },
];

const cx = concatClasses.bind(styles);

export interface SearchPopupProps
    extends Omit<PopoverProps, 'ref' | 'children'> {
    isLoading?: boolean;
    films?: Film[];
    persons?: PersonActor[];
}

export class SearchPopup extends AppComponent<SearchPopupProps> {
    render() {
        const { isLoading, className, isOpen, films, persons, ...props } =
            this.props;

        return (
            <Popover
                className={cx('popup', className)}
                isOpen={isOpen}
                {...props}
            >
                <div className={cx('content', { loading: isLoading })}>
                    {!!films?.length && (
                        <section className={cx('section')}>
                            <h1 className={cx('label')}>Фильмы и сериалы</h1>
                            <div className={cx('list')}>
                                {FILMS.map((film) => (
                                    <SearchItem film={film} />
                                ))}
                            </div>
                        </section>
                    )}
                    {!!persons?.length && (
                        <section className={cx('section')}>
                            <h1 className={cx('label')}>Персоны</h1>
                            <div className={cx('list')}>
                                {ACTORS.map((actor) => (
                                    <SearchItem person={actor} />
                                ))}
                            </div>
                        </section>
                    )}
                    {!films?.length && !persons?.length && (
                        <p style="text-align:center">
                            По вашему запросу ничего не найдено
                        </p>
                    )}
                </div>
                {isLoading && (
                    <div className={cx('spinner-container')}>
                        <Spinner />
                    </div>
                )}
            </Popover>
        );
    }
}
