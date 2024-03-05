import { Core } from '../../core/Core.js';
import { Component } from '../../core/src/Component.js';
import { Rating } from '../Badges/Rating.js';

class FilmCardInner extends Component {
    fetchFilm = (ID) => {
        fetch(
            `http://localhost:8000/content/contentPreview?${new URLSearchParams(
                {
                    id: ID,
                },
            )}`,
        )
            .then((response) => response.json())
            .then((data) => {
                this.setState((prev) => ({
                    ...prev,
                    ...data,
                }));
            });
    };

    componentDidMount() {
        this.fetchFilm(this.props.id);
    }

    render(props, state) {
        const rating = Rating();
        rating.setState({ rating: state?.rating });

        return Core.createElement(
            'div',
            { class: 'card' },
            Core.createElement(
                'div',
                { class: 'poster' },
                rating,
                Core.createElement('img', {
                    src: `http://localhost:8000/static/${state?.poster ?? ''}`,
                    alt: 'Постер',
                }),
            ),
            Core.createElement(
                'div',
                { class: 'card-info' },
                Core.createElement('h5', state?.title ?? ''),
                Core.createElement(
                    'span',
                    {},
                    `${state?.original_title === '' ? state?.title ?? '' : state?.original_title}, ${state?.release_year ?? ''}, ${state?.duration ?? ''} мин.`,
                ),
                Core.createElement(
                    'span',
                    {},
                    `${state?.country ?? ''} ▸ ${state?.genre ?? ''} ▸ Режиссёр: ${state?.director ?? ''}`,
                ),
                Core.createElement(
                    'span',
                    {},
                    `В ролях: ${state?.actors ? state.actors.join(', ') : ''}`,
                ),
            ),
        );
    }
}

export const FilmCard = (props) => new FilmCardInner(props);
