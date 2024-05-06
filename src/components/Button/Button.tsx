import styles from './Button.module.scss';

import { AppComponent } from '@/core';
import { Spinner } from '@/components/Spinner';
import { concatClasses, isPrimitive } from '@/utils';
import { Link } from '@/components/Link';
import type { LinkProps } from '@/components/Link/Link';

const cx = concatClasses.bind(styles as Record<string, string | undefined>);

export interface InputProps
    extends App.DetailedHTMLProps<
            App.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >,
        Partial<Pick<LinkProps, 'href' | 'rel' | 'target'>> {
    isLoading?: boolean;
    outlined?: boolean;
    styleType?: 'primary' | 'secondary' | 'error';
    rounded?: boolean;
    isIconOnly?: boolean;
    isText?: boolean;
    isFullWidth?: boolean;
    size?: 'small';
}

export class Button extends AppComponent<InputProps> {
    render() {
        const {
            isLoading,
            className,
            children,
            outlined,
            href,
            rel,
            target,
            type = 'button',
            styleType = 'primary',
            rounded,
            isIconOnly,
            isText,
            isFullWidth,
            size,
            ...props
        } = this.props;

        return href ? (
            <Link
                href={href}
                className={className}
                rel={rel}
                target={target}
                aria-label={isPrimitive(children) ? `${children || ''}` : ''}
            >
                <button
                    {...props}
                    type={type}
                    className={cx('button', {
                        styleType,
                        loading: isLoading,
                        outlined,
                        rounded,
                        'icon-only': isIconOnly,
                        text: isText,
                        'full-width': isFullWidth,
                        small: size === 'small',
                    })}
                    aria-hidden
                    tabIndex={-1}
                >
                    {isLoading ? <Spinner /> : children}
                </button>
            </Link>
        ) : (
            <button
                {...props}
                type={type}
                className={cx('button', className, {
                    styleType,
                    loading: isLoading,
                    outlined,
                    rounded,
                    'icon-only': isIconOnly,
                    text: isText,
                    'full-width': isFullWidth,
                    small: size === 'small',
                })}
            >
                {isLoading ? <Spinner /> : children}
            </button>
        );
    }
}
