import { routes } from '../../App/App.routes';
import { HistoryContext } from '../../Providers/HistoryProvider';
import { IcLogo } from '../../assets/icons/IcLogo';
import { Link } from '../Link/Link';

export const LogoButton = HistoryContext.Connect((props) =>
    Link({
        ...props,
        href: routes.root(),
        children: [IcLogo()],
    }),
);
