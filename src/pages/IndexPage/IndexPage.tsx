import { AppComponent } from '@/core';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { LayoutPreview } from '@/layouts/LayoutPreview';
import { routes } from '@/App/App.routes';
import type { Film } from '@/api/content/types';
import { contentService } from '@/api/content/service';
import { LayoutGrid } from '@/layouts/LayoutGrid';
import { FilmCard } from '@/components/FilmCard';
import { convertReleaseToFilm } from '@/utils';

export interface IndexPageState {
    films?: Film[];
}

export class IndexPage extends AppComponent<object, IndexPageState> {
    loadReleases = () => {
        void contentService.getNearestReleases().then((response) => {
            this.setState((prev) => ({
                ...prev,
                films: response?.ongoing_content_list?.map(
                    convertReleaseToFilm,
                ),
            }));
        });
    };

    componentDidMount() {
        this.loadReleases();
    }

    render() {
        const { films } = this.state;

        return (
            <LayoutWithHeader>
                <LayoutPreview
                    title="Ожидаемые релизы"
                    moreTitle="Календарь релизов"
                    moreLink={routes.releases()}
                >
                    <LayoutGrid itemsPerRow={6} itemsPerRowMobile={2}>
                        {films?.map((films) => (
                            <FilmCard film={films} size="small" link="" />
                        ))}
                    </LayoutGrid>
                </LayoutPreview>
            </LayoutWithHeader>
        );
    }
}
