import styles from './SearchPopup.module.scss';

import type { PopoverProps } from '@/components/Popover/Popover';
import { Popover } from '@/components/Popover';
import { Spinner } from '@/components/Spinner';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';
import { SearchItem } from '@/components/SearchItem';
import type { Film, PersonActor } from '@/api/content/types';

const FILMS: Film[] = [];

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
