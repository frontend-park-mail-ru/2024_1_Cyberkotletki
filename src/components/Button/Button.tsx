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
                    className={cx('button', {
                        loading: isLoading,
                        outlined,
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
                className={cx('button', className, {
                    loading: isLoading,
                    outlined,
                })}
            >
                {isLoading ? <Spinner /> : children}
            </button>
        );
    }
}
