import { AppComponent } from '@/appCore/src/AppComponent';
import { FilmsContainer } from '@/components/FilmsContainer';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';

export class IndexPage extends AppComponent {
    render() {
        return (
            <LayoutWithHeader>
                <FilmsContainer />
            </LayoutWithHeader>
        );
    }
}
