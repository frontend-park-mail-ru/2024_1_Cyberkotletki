import { Core } from '../../core/Core.js';
import { Component } from '../../core/src/Component.js';
import { Rating } from '../Badges/Rating.js';

class FilmCardInner extends Component {
    state = {
        loaded: false,
    };

    fetchFilm = (ID) => {
        fetch(
            `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/content/contentPreview?${new URLSearchParams(
                {
                    id: ID,
                },
            )}`,
        )
            .then((response) => response.json())
            .then((data) => {
                this.setState((prev) => ({
                    ...prev,
                    loaded: true,
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
            this.state.loaded &&
                Core.createElement(
                    'div',
                    { class: 'poster' },
                    rating,
                    Core.createElement('img', {
                        src: `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/static/${state?.poster ?? ''}`,
                        alt: 'Постер',
                    }),
                ),
            this.state.loaded &&
                Core.createElement(
                    'div',
                    { class: 'card-info' },
                    Core.createElement('h5', !!state?.title ?? ''),
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
