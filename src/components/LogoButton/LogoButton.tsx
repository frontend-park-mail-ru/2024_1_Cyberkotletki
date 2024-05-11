import { routes } from '@/App/App.routes';
import { AppComponent } from '@/core';
import { icLogoUrl } from '@/assets/icons';
import { Link } from '@/components/Link';
import type { LinkProps } from '@/components/Link/Link';

export type LogoButtonProps = Omit<LinkProps, 'children' | 'href' | 'ref'>;

export class LogoButton extends AppComponent<LogoButtonProps> {
    render() {
        return (
            <Link
                {...this.props}
                href={routes.root()}
                aria-label="На главную страницу"
            >
                <img src={icLogoUrl} aria-hidden />
            </Link>
        );
    }
}
