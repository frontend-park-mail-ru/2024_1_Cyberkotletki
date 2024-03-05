import { Core } from '../../core/Core.js';
import { Component } from '../../core/src/Component.js';
import { OutlineButton } from '../Buttons/OutlineButton.js';
import { FilmCard } from '../Cards/FilmCard.js';

class FilmsContainerInner extends Component {
    render(props, state) {
        // todo: сделать fetch для списка фильмов
      fetch('http://localhost:8000/collections/compilation/')
        const filmsIds = [1, 2, 3];
        const buttonAllGenres = OutlineButton({
            buttonText: 'Всё',
            click: () => {},
        });
        const buttonComedian = OutlineButton({
            buttonText: 'Комедия',
            click: () => {},
        });
        const buttonAction = OutlineButton({
            buttonText: 'Боевик',
            click: () => {},
        });
        const buttonDrama = OutlineButton({
            buttonText: 'Драма',
            click: () => {},
        });

        return Core.createElement(
            'div',
            { class: 'container' },
            Core.createElement(
                'h4',
                { style: 'margin-top: 48px;' },
                'Специально для вас',
            ),
            Core.createElement(
                'div',
                { class: 'categories' },
                buttonAllGenres,
                buttonComedian,
                buttonAction,
                buttonDrama,
            ),
            Core.createElement(
                'div',
                { class: 'grid-container' },
                // для каждого айди фильма генерируем карточку фильма
                ...filmsIds.map(() =>
                    FilmCard({
                        id: 0,
                        posterSrc:
                            'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/136x204',
                        title: 'Название фильма',
                        originalTitle: 'Original Title',
                        releaseYear: '2014',
                        country: 'Россия',
                        genre: 'Боевик',
                        director: 'Квентин Тарантино',
                        actors: ['Том Хэнкс', 'Сергей Бодров'],
                        duration: 169,
                        rating: (0.0).toString(10),
                    }),
                ),
            ),
        );
    }
}

export const FilmsContainer = (props) => new FilmsContainerInner(props);
