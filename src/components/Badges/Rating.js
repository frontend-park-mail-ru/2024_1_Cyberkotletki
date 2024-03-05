import { Core } from '../../core/Core.js';
import { Component } from '../../core/src/Component.js';

class RatingInner extends Component {
    state = { rating: 0.0 };

    render(props, state) {
        return Core.createElement(
            'div',
            { class: 'rating-circle' },
            Core.createElement(
                'span',
                { class: 'rating-circle' },
                state.rating,
            ),
        );
    }
}

export const Rating = (props) => new RatingInner(props);
