import styles from './SearchPopup.module.scss';

import type { PopoverProps } from '@/components/Popover/Popover';
import { Popover } from '@/components/Popover';
import { Spinner } from '@/components/Spinner';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';
import { SearchItem } from '@/components/SearchItem';
import type { PersonActor, SearchContent } from '@/api/content/types';

const cx = concatClasses.bind(styles);

export interface SearchPopupProps
    extends Omit<PopoverProps, 'ref' | 'children'> {
    isLoading?: boolean;
    films?: SearchContent[];
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
                                {films.map((film) => (
                                    <SearchItem film={film} />
                                ))}
                            </div>
                        </section>
                    )}
                    {!!persons?.length && (
                        <section className={cx('section')}>
                            <h1 className={cx('label')}>Персоны</h1>
                            <div className={cx('list')}>
                                {persons.map((person) => (
                                    <SearchItem person={person} />
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
