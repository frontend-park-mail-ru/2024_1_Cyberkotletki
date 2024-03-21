import type { AppNode } from '@/appCore/shared/AppNode.types';
import { isPrimitive } from '@/utils';

export const isChangedElements = (nodeLeft: AppNode, nodeRight: AppNode) => {
    if (isPrimitive(nodeLeft)) {
        return nodeLeft !== nodeRight;
    }

    if (isPrimitive(nodeRight)) {
        return true;
    }

    return nodeLeft.type !== nodeRight.type;
};
