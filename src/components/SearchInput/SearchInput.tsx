import styles from './SearchInput.module.scss';
import { SearchPopup } from './SearchPopup';

import { icCloseUrl, icSearchUrl } from '@/assets/icons';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import type { SearchPopupProps } from '@/components/SearchInput/SearchPopup/SearchPopup';
import { AppComponent } from '@/core';
import { concatClasses, debounce, hasField } from '@/utils';

const cx = concatClasses.bind(styles);

export interface SearchInputProps
    extends Omit<
            App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLDivElement>,
                HTMLDivElement
            >,
            'ref' | 'children'
        >,
        Pick<SearchPopupProps, 'persons' | 'films'> {
    isLoading?: boolean;
    onSearch?: (searchString?: string) => void;
    searchDelay?: number;
    onOpen?: () => void;
    onClose?: () => void;
}

export interface SearchInputState {
    isFocused?: boolean;
    value?: string;
    showPopover?: boolean;
    inputRef: App.RefObject<HTMLInputElement>;
}

export class SearchInput extends AppComponent<
    SearchInputProps,
    SearchInputState
> {
    state: SearchInputState = { inputRef: { current: null } };

    handleSearchFocus = () => {
        this.setState((prev) => ({ ...prev, isFocused: true }));

        this.props.onOpen?.();
    };

    handleSearchClose = () => {
        this.setState((prev) => ({ ...prev, isFocused: false }));

        this.props.onClose?.();
    };

    handleSearch = debounce((event: App.FormEvent<HTMLInputElement>) => {
        const value = hasField(event.target, 'value', 'string')
            ? event.target.value
            : '';

        this.setState((prev) => ({ ...prev, value }));

        this.props.onSearch?.(value);
    }, this.props.searchDelay ?? 400);

    componentDidUpdate(prevState: SearchInputState | null): void {
        if (
            prevState?.isFocused !== this.state.isFocused &&
            this.state.isFocused
        ) {
            setTimeout(() => {
                this.state.inputRef.current?.focus();
            }, 10);
        }
    }

    render() {
        const { className, persons, films, isLoading, ...props } = this.props;
        const { isFocused } = this.state;

        return (
            <div
                className={cx('container', className, { focused: isFocused })}
                {...props}
            >
                {isFocused ? (
                    <div className={cx('input-container')}>
                        <button
                            className={cx('button-wrapper')}
                            popoverTarget="search-popover"
                            popoverTargetAction="show"
                        >
                            <Input
                                inputType="input"
                                inputRef={this.state.inputRef}
                                type="search"
                                placeholder="Поиск"
                                onInput={this.handleSearch}
                            />
                        </button>
                        <Button
                            onClick={this.handleSearchClose}
                            outlined
                            isIconOnly
                            styleType="secondary"
                            className={cx('close-button')}
                            aria-label="Закрыть поиск"
                        >
                            <Icon icon={icCloseUrl} />
                        </Button>
                        <SearchPopup
                            id="search-popover"
                            isOpen={isFocused}
                            isLoading={isLoading}
                            persons={persons}
                            films={films}
                        />
                    </div>
                ) : (
                    <Button
                        onClick={this.handleSearchFocus}
                        outlined
                        isIconOnly
                        styleType="secondary"
                        aria-label="Поиск"
                        title="Поиск"
                    >
                        <Icon icon={icSearchUrl} />
                    </Button>
                )}
            </div>
        );
    }
}
