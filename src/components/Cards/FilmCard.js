import { Core } from '../../core/Core.js';
import { Component } from '../../core/src/Component.js';
import { Rating } from '../Badges/Rating.js';
import { contentService } from '../../api/content/service';

class FilmCardInner extends Component {
    state = {
        loaded: false,
    };

    getFilm = (id) => {
        contentService.getPreviewContentCard(id).then((data) => {
            this.setState((prev) => ({
                ...prev,
                ...data,
                loaded: true,
            }));
        });
    };

    componentDidMount() {
        this.getFilm(this.props.id);
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
                        src: `${process.env.BACKEND_HOST}/static/${state?.poster ?? ''}`,
                        alt: 'Постер',
                    }),
                ),
            this.state.loaded &&
                Core.createElement(
                    'div',
                    { class: 'card-info' },
                    Core.createElement('h5', state?.title ?? ''),
                    Core.createElement(
                        'span',
                        {},
                        `${state?.originalTitle === '' ? state?.title ?? '' : state?.originalTitle}, ${state?.releaseYear ?? ''}, ${state?.duration ?? ''} мин.`,
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
