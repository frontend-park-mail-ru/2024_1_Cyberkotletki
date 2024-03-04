import { isEqual } from '../../utils/isEqual.js';

export class Props {
    /**
     * @type {Array<Component|Node|string|number>}
     */
    children;

    /**
     * @type {Array<Component|Node|string|number>}
     */
    context;
}

export class Component {
    /**
     * @type {Object}
     */
    state = null;

    /**
     * @type {Props|null}
     */
    props = null;

    /**
     * @type {Node|null}
     */
    owner = null;

    /**
     * @type {Component|Node|null}
     */
    lastRenderedNode = undefined;

    /**
     *
     * @param {Props} props
     */
    constructor(props) {
        if (typeof props === 'object') {
            this.props = props;
        }
    }

    /**
     *
     * @param {(prev)=>void|object} state
     */
    setState(state) {
        const newState =
            typeof state === 'function' ? state(this.state) : state;

        if (typeof newState === 'object') {
            if (this.shouldComponentUpdate(this.props, newState)) {
                this.state = newState;

                this.innerRender();
            } else {
                this.state = newState;
            }
        }
    }

    /**
     *
     * @param {Object} nextProps
     * @param {Object} nextState
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        if (
            !isEqual(this.props, nextProps) ||
            !isEqual(this.state, nextState)
        ) {
            return true;
        }

        return false;
    }

    /**
     *
     * @param {object} props
     * @param {object} state
     * @returns {Component|Node|null}
     */
    render(props, state) {
        void props;
        void state;

        return null;
    }

    /**
     *
     * @param {Node|Component} owner
     * @returns {HTMLElement}
     */
    innerRender(owner) {
        if (owner && (owner instanceof Node || owner instanceof Component)) {
            this.owner = owner;
        }

        let renderedContent = this.render(this.props, this.state);

        while (renderedContent instanceof Component) {
            renderedContent = renderedContent.innerRender(this);
        }

        if (
            this.owner instanceof Node &&
            (renderedContent instanceof Node || renderedContent === null)
        ) {
            if (this.lastRenderedNode !== undefined) {
                const { lastRenderedNode } = this;

                requestAnimationFrame(() => {
                    lastRenderedNode.replaceWith(renderedContent ?? '');
                    this.componentDidUpdate();
                });
            } else {
                this.componentWillMount();

                requestAnimationFrame(() => {
                    if (renderedContent) {
                        this.owner.append(renderedContent);
                    }

                    this.componentDidMount();
                });
            }
        }

        this.lastRenderedNode = renderedContent;

        return renderedContent;
    }

    componentWillMount() {
        return Promise.resolve(undefined);
    }

    componentDidMount() {
        return Promise.resolve(undefined);
    }

    componentDidUpdate() {}
}
