import { Core } from '../../core/Core.js';
import { Component } from '../../core/src/Component.js';
import { Rating } from '../Badges/Rating.js';

class FilmCardInner extends Component {
    state = {
        id: 0,
        posterSrc: '',
        title: '',
        originalTitle: '',
        releaseYear: '',
        country: '',
        genre: '',
        director: '',
        actors: [],
        rating: 0.0,
    };

    render(props, state) {
        // todo сделать fetch и засунуть полученную инфу в state

        const rating = Rating();
        rating.setState({ rating: props.rating });

        return Core.createElement(
            'div',
            { class: 'card' },
            Core.createElement(
                'div',
                { class: 'poster' },
                rating,
                Core.createElement('img', {
                    src: props.posterSrc,
                    alt: 'Постер',
                }),
            ),
            Core.createElement(
                'div',
                { class: 'card-info' },
                Core.createElement('h5', props.title),
                Core.createElement(
                    'span',
                    {},
                    `${props.originalTitle}, ${props.releaseYear}, ${props.duration} мин.`,
                ),
                Core.createElement(
                    'span',
                    {},
                    `${props.country} ▸ ${props.genre} ▸ Режиссёр: ${props.director}`,
                ),
                Core.createElement(
                    'span',
                    {},
                    `В ролях: ${props.actors.join(', ')}`,
                ),
            ),
        );
    }
}

export const FilmCard = (props) => new FilmCardInner(props);
