import { createRoot } from '@/appCore/app-dom';
import { AppComponent } from '@/appCore/src/AppComponent';

interface ButtonProps {
    children?: JSX.Children;
}

interface ButtonState {
    count: number;
    showBadge: boolean;
    onClick: (event: App.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
interface CounterProps {
    count?: number;
}

class Counter extends AppComponent<CounterProps> {
    componentDidMount() {
        // console.log('Mount Badge');
    }

    componentWillUnmount() {
        // console.log('Will unmount Badge');
    }

    componentDidUpdate() {
        // console.log('Did update Badge');
        // console.log('Prev props', prevProps);
    }

    render() {
        return <div class="badge">Counter {this.props?.count}</div>;
    }
}

interface BadgeProps {
    count: number;
}

class Badge extends AppComponent<BadgeProps> {
    state = { divRef: { current: null } as App.RefObject<HTMLDivElement> };

    componentDidMount() {
        // console.log('Mount Badge', this.state.divRef.current);
    }

    componentWillUnmount() {
        // console.log('Will unmount Badge');
    }

    componentDidUpdate() {
        // console.log('Prev props', prevProps);
    }

    render() {
        return (
            <div class="badge" ref={this.state.divRef}>
                Badge <Counter count={this.props?.count} />
            </div>
        );
    }
}

class Button extends AppComponent<ButtonProps, ButtonState> {
    state = {
        count: 0,
        showBadge: false,
        onClick: (e: App.MouseEvent<HTMLButtonElement, MouseEvent>) => void e,
    };

    componentWillMount() {
        // console.log('Will mount Button');

        this.state = {
            ...this.state,
            onClick: (e) => {
                e.stopPropagation();

                this.setState((prev) => ({
                    ...prev,
                    showBadge: !prev.showBadge,
                    count: prev.count + 1,
                }));
            },
        };
    }

    componentDidMount() {
        // console.log('Did mount Button');
    }

    componentDidUpdate() {
        // console.log('Did update Button');
        // console.log('Prev', prevState);
        // console.log('Next', this.state);
    }

    componentWillUnmount() {
        // console.log('Will unmount Button');
    }

    render() {
        return (
            <button onClick={this.state.onClick}>
                {'0'}
                {'2'}
                {this.props?.children}
                {this.state.showBadge && <Badge count={this.state.count} />}
                {!this.state.showBadge && this.state.count}
                {this.state.count}
                <Badge count={this.state.count} />
            </button>
        );
    }
}

const div = (
    <div>
        Hello
        <button>Button</button>
        <span tabIndex={0} role="button" key="enter" accessKey="enter">
            Hello from span
        </span>
        <Button>
            Click Me!! <Button>Button in Button</Button>
            {Array.from({ length: 10 }).map((_, index) => (
                <li>{index}</li>
            ))}
        </Button>
        <ul></ul>
    </div>
);

createRoot(document.getElementById('root'), div);
