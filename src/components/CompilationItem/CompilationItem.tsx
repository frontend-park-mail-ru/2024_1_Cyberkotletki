import styles from './CompilationItem.module.scss';

import { routes } from '@/App/App.routes';
import type { Compilation } from '@/api/content/types';
import { LazyImg } from '@/components/LazyImg';
import { Link } from '@/components/Link';
import { AppComponent } from '@/core';
import { concatClasses, getStaticUrl } from '@/utils';

const cx = concatClasses.bind(styles);

export interface CompilationItemProps
    extends Omit<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>,
        'children'
    > {
    compilation?: Compilation;
}

export class CompilationItem extends AppComponent<CompilationItemProps> {
    render() {
        const { className, compilation, ...props } = this.props;

        return (
            <Link
                className={cx(className)}
                href={routes.collections(compilation?.id)}
                aria-label={compilation?.title}
            >
                <article {...props} className={cx('item')}>
                    <LazyImg
                        src={getStaticUrl(compilation?.poster)}
                        width="144px"
                        height="144px"
                        className={cx('poster')}
                        alt="Постер подборки"
                    />
                    <div className={cx('info')}>
                        <h1 className={cx('head')} title={compilation?.title}>
                            {compilation?.title}
                        </h1>
                    </div>
                </article>
            </Link>
        );
    }
}
