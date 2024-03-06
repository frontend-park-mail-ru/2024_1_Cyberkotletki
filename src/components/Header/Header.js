import { Core } from '../../core/Core.js';
import { Component } from '../../core/src/Component.js';
import { Link } from '../Link/Link.js';
import { routes } from '../../App/App.routes.js';
import { AuthContext } from '../../Providers/AuthProvider.js';

class Button extends Component {
    state = {
        buttonText: 0,
    };

    render(props, state) {
        return Core.createElement(
            'button',
            {
                'data-header-button': true,
                onClick: () => {
                    this.setState((prev) => ({
                        ...prev,
                        buttonText: prev.buttonText + 1,
                    }));
                },
            },
            state.buttonText,
        );
    }
}

class HeaderInner extends Component {
    state = { buttonText: 0, response: null };

    componentDidMount() {
        fetch('https://api.github.com/orgs/nodejs')
            .then((response) => response.json())
            .then((data) => {
                this.setState((prev) => ({ ...prev, response: data }));
            });
    }

    render(props, state) {
        return Core.createElement(
            'header',
            Core.createElement(
                'h1',
                props.title,
                `${props.context.isLoggedIn}`,
            ),
            Core.createElement(
                'nav',
                Core.createElement(
                    'ul',
                    Core.createElement(
                        'li',
                        Link({ href: routes.root(), children: ['Home'] }),
                    ),
                    Core.createElement(
                        'li',
                        Link({
                            href: routes.login(),
                            children: ['Login'],
                        }),
                    ),
                ),
                new Button(),
                Core.createElement(
                    'pre',
                    JSON.stringify(state.response, null, 2),
                ),
            ),
        );
    }
}

export const Header = AuthContext.Connect((props) => new HeaderInner(props));
