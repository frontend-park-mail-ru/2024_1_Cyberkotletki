import type { AppElement } from '@/core/shared/AppElement.type';
import { AppComponent } from '@/core/src/AppComponent';
import type { AppComponentConstructor } from '@/core/src/AppComponent.types';

export const generateInstance = (
    element: AppElement<AppComponentConstructor<object>, HTMLElement>,
) => {
    const GenerateInstance = element.type;

    return element.type.prototype instanceof AppComponent
        ? new GenerateInstance(element.props ?? {})
        : (
              GenerateInstance as unknown as (
                  props: object,
              ) => AppComponent<object, object>
          )(element.props ?? {});
};
