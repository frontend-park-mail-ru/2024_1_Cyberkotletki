import { isEqual } from '../../utils/isEqual.js';

export class Props {
    /**
     * @type {Array<Component|HTMLElement|string|number>}
     */
    children;
}

export class Component {
    /** @type {object|null}*/
    state = null;

    /** @type {Props|null} */
    props = null;

    /** @type {HTMLElement|Component|null}*/
    owner = null;

    /** @type {Component|HTMLElement|null|undefined} */
    lastRenderedNode = undefined;

    /** @type {boolean} */
    static rendered = false;

    /** @param {Props} props Пропсы компонента*/
    constructor(props) {
        this.rendered = false;
        this.props = props;
    }

    /**
     * @param {{rating: (number|*)}} newState
     * Новое состояние компонента или функция, возвращающая новое состояние
     */
    setState(newState) {
        const gotState =
            typeof newState === 'function' ? newState(this.state) : newState;

        if (this.shouldComponentUpdate(this.props, gotState)) {
            this.state = gotState;

            this.innerRender(this.owner);
        } else {
            this.state = gotState;
        }
    }

    /**
     *
     * @param {object} nextProps Новые пропсы
     * @param {object} nextState Новое состояние
     * @returns {boolean} Флаг, показывающий, нужно ли обновить компонент
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
     * @param {object} props Пропсы компонента
     * @param {object} state Состояние компонента
     * @returns {Component|HTMLElement|null} Компонент, узел или null
     */
    render(props, state) {
        void props;
        void state;

        return null;
    }

    /**
     *
     * @param {HTMLElement|Component|null} owner Родительский узел
     * @returns {HTMLElement|null} Узел или null
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

    componentWillMount() {}

    componentDidMount() {}

    componentDidUpdate() {}
}
