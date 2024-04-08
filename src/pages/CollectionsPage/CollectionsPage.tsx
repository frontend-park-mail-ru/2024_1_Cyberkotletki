import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';

export class CollectionsPage extends AppComponent {
    render(): AppNode {
        return (
            <LayoutWithHeader>
                <div>Collections</div>
                <div>Soon...</div>
            </LayoutWithHeader>
        );
    }
}
