import type { AppElement } from '@/core/shared/AppElement.type';
import type { AppNode } from '@/core/shared/AppNode.types';
import type { AppComponent } from '@/core';

/* eslint-disable no-use-before-define */
type NativeAnimationEvent = AnimationEvent;
type NativeClipboardEvent = ClipboardEvent;
type NativeCompositionEvent = CompositionEvent;
type NativeDragEvent = DragEvent;
type NativeFocusEvent = FocusEvent;
type NativeKeyboardEvent = KeyboardEvent;
type NativeMouseEvent = MouseEvent;
type NativeTouchEvent = TouchEvent;
type NativePointerEvent = PointerEvent;
type NativeTransitionEvent = TransitionEvent;
type NativeUIEvent = UIEvent;
type NativeWheelEvent = WheelEvent;
type Booleanish = boolean | 'true' | 'false';
type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

interface Children {
    children?: Record<string, never>;
}

type GlobalJSXElementChildrenAttribute = Children;

declare global {
    namespace App {
        type Key = string | number | bigint;

        interface Iterator<T, TReturn = unknown, TNext = undefined> {
            // NOTE: 'next' is defined using a tuple to ensure we report
            // the correct assignability errors in all places.
            next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
            return?(value?: TReturn): IteratorResult<T, TReturn>;
            throw?(e?: unknown): IteratorResult<T, TReturn>;
        }

        interface Iterable<T> {
            [Symbol.iterator](): Iterator<T>;
        }

        //
        // Event System
        // ----------------------------------------------------------
        interface BaseSyntheticEvent<E = object, C = unknown, T = unknown> {
            nativeEvent: E;
            currentTarget: C;
            target: T;
            bubbles: boolean;
            cancelable: boolean;
            defaultPrevented: boolean;
            eventPhase: number;
            isTrusted: boolean;
            preventDefault(): void;
            isDefaultPrevented(): boolean;
            stopPropagation(): void;
            isPropagationStopped(): boolean;
            persist(): void;
            timeStamp: number;
            type: string;
        }

        /**
         * currentTarget - a reference to the element
         * on which the event listener is registered.
         *
         * target - a reference to the element from which the event
         * was originally dispatched.
         * This might be a child element to the element on which
         * the event listener is registered.
         * If you thought this should be `EventTarget & T`,
         * @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682
         */
        type SyntheticEvent<T = Element, E = Event> = BaseSyntheticEvent<
            E,
            EventTarget & T,
            EventTarget
        >;

        interface ClipboardEvent<T = Element>
            extends SyntheticEvent<T, NativeClipboardEvent> {
            clipboardData: DataTransfer;
        }

        interface CompositionEvent<T = Element>
            extends SyntheticEvent<T, NativeCompositionEvent> {
            data: string;
        }

        interface MouseEvent<T = Element, E = NativeMouseEvent>
            extends UIEvent<T, E> {
            altKey: boolean;
            button: number;
            buttons: number;
            clientX: number;
            clientY: number;
            ctrlKey: boolean;
            /**
             * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
             */
            getModifierState(key: ModifierKey): boolean;
            metaKey: boolean;
            movementX: number;
            movementY: number;
            pageX: number;
            pageY: number;
            relatedTarget: EventTarget | null;
            screenX: number;
            screenY: number;
            shiftKey: boolean;
        }

        interface DragEvent<T = Element>
            extends MouseEvent<T, NativeDragEvent> {
            dataTransfer: DataTransfer;
        }

        interface PointerEvent<T = Element>
            extends MouseEvent<T, NativePointerEvent> {
            pointerId: number;
            pressure: number;
            tangentialPressure: number;
            tiltX: number;
            tiltY: number;
            twist: number;
            width: number;
            height: number;
            pointerType: 'mouse' | 'pen' | 'touch';
            isPrimary: boolean;
        }

        interface FocusEvent<Target = Element, RelatedTarget = Element>
            extends SyntheticEvent<Target, NativeFocusEvent> {
            relatedTarget: (EventTarget & RelatedTarget) | null;
            target: EventTarget & Target;
        }

        type FormEvent<T = Element> = SyntheticEvent<T>;

        interface InvalidEvent<T = Element> extends SyntheticEvent<T> {
            target: EventTarget & T;
        }

        interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
            target: EventTarget & T;
        }

        export type ModifierKey =
            | 'Alt'
            | 'AltGraph'
            | 'CapsLock'
            | 'Control'
            | 'Fn'
            | 'FnLock'
            | 'Hyper'
            | 'Meta'
            | 'NumLock'
            | 'ScrollLock'
            | 'Shift'
            | 'Super'
            | 'Symbol'
            | 'SymbolLock';

        interface UIEvent<T = Element, E = NativeUIEvent>
            extends SyntheticEvent<T, E> {
            detail: number;
            view: AbstractView;
        }

        interface KeyboardEvent<T = Element>
            extends UIEvent<T, NativeKeyboardEvent> {
            altKey: boolean;
            /** @deprecated */
            charCode: number;
            ctrlKey: boolean;
            code: string;
            /**
             * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
             */
            getModifierState(key: ModifierKey): boolean;
            /**
             * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible values
             */
            key: string;
            /** @deprecated */
            keyCode: number;
            locale: string;
            location: number;
            metaKey: boolean;
            repeat: boolean;
            shiftKey: boolean;
            /** @deprecated */
            which: number;
        }

        interface TouchEvent<T = Element> extends UIEvent<T, NativeTouchEvent> {
            altKey: boolean;
            changedTouches: TouchList;
            ctrlKey: boolean;
            /**
             * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
             */
            getModifierState(key: ModifierKey): boolean;
            metaKey: boolean;
            shiftKey: boolean;
            targetTouches: TouchList;
            touches: TouchList;
        }

        interface WheelEvent<T = Element>
            extends MouseEvent<T, NativeWheelEvent> {
            deltaMode: number;
            deltaX: number;
            deltaY: number;
            deltaZ: number;
        }

        interface AnimationEvent<T = Element>
            extends SyntheticEvent<T, NativeAnimationEvent> {
            animationName: string;
            elapsedTime: number;
            pseudoElement: string;
        }

        interface TransitionEvent<T = Element>
            extends SyntheticEvent<T, NativeTransitionEvent> {
            elapsedTime: number;
            propertyName: string;
            pseudoElement: string;
        }

        //
        // Event Handler Types
        // ---------------------------------------------

        type EventHandler<E extends SyntheticEvent<unknown>> = {
            bivarianceHack(event: E): void;
        }['bivarianceHack'];

        type AppEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;

        type ClipboardEventHandler<T = Element> = EventHandler<
            ClipboardEvent<T>
        >;
        type CompositionEventHandler<T = Element> = EventHandler<
            CompositionEvent<T>
        >;
        type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
        type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
        type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
        type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
        type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
        type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
        type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
        type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
        type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
        type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
        type AnimationEventHandler<T = Element> = EventHandler<
            AnimationEvent<T>
        >;
        type TransitionEventHandler<T = Element> = EventHandler<
            TransitionEvent<T>
        >;

        //
        // Props / DOM Attributes
        // -------------------------------------

        interface DOMAttributes<T> {
            children?: JSX.Node | undefined;
            dangerouslySetInnerHTML?:
                | {
                      // Should be InnerHTML['innerHTML'].
                      // But unfortunately we're mixing
                      // renderer-specific type declarations.
                      __html: string | NonNullable<unknown>;
                  }
                | undefined;

            // Clipboard Events
            onCopy?: ClipboardEventHandler<T> | undefined;
            onCopyCapture?: ClipboardEventHandler<T> | undefined;
            onCut?: ClipboardEventHandler<T> | undefined;
            onCutCapture?: ClipboardEventHandler<T> | undefined;
            onPaste?: ClipboardEventHandler<T> | undefined;
            onPasteCapture?: ClipboardEventHandler<T> | undefined;

            // Composition Events
            onCompositionEnd?: CompositionEventHandler<T> | undefined;
            onCompositionEndCapture?: CompositionEventHandler<T> | undefined;
            onCompositionStart?: CompositionEventHandler<T> | undefined;
            onCompositionStartCapture?: CompositionEventHandler<T> | undefined;
            onCompositionUpdate?: CompositionEventHandler<T> | undefined;
            onCompositionUpdateCapture?: CompositionEventHandler<T> | undefined;

            // Focus Events
            onFocus?: FocusEventHandler<T> | undefined;
            onFocusCapture?: FocusEventHandler<T> | undefined;
            onBlur?: FocusEventHandler<T> | undefined;
            onBlurCapture?: FocusEventHandler<T> | undefined;

            // Form Events
            onChange?: FormEventHandler<T> | undefined;
            onChangeCapture?: FormEventHandler<T> | undefined;
            onBeforeInput?: FormEventHandler<T> | undefined;
            onBeforeInputCapture?: FormEventHandler<T> | undefined;
            onInput?: FormEventHandler<T> | undefined;
            onInputCapture?: FormEventHandler<T> | undefined;
            onReset?: FormEventHandler<T> | undefined;
            onResetCapture?: FormEventHandler<T> | undefined;
            onSubmit?: FormEventHandler<T> | undefined;
            onSubmitCapture?: FormEventHandler<T> | undefined;
            onInvalid?: FormEventHandler<T> | undefined;
            onInvalidCapture?: FormEventHandler<T> | undefined;

            // Image Events
            onLoad?: AppEventHandler<T> | undefined;
            onLoadCapture?: AppEventHandler<T> | undefined;
            onError?: AppEventHandler<T> | undefined; // also a Media Event
            onErrorCapture?: AppEventHandler<T> | undefined;

            // Keyboard Events
            onKeyDown?: KeyboardEventHandler<T> | undefined;
            onKeyDownCapture?: KeyboardEventHandler<T> | undefined;
            /** @deprecated */
            onKeyPress?: KeyboardEventHandler<T> | undefined;
            /** @deprecated */
            onKeyPressCapture?: KeyboardEventHandler<T> | undefined;
            onKeyUp?: KeyboardEventHandler<T> | undefined;
            onKeyUpCapture?: KeyboardEventHandler<T> | undefined;

            // Media Events
            onAbort?: AppEventHandler<T> | undefined;
            onAbortCapture?: AppEventHandler<T> | undefined;
            onCanPlay?: AppEventHandler<T> | undefined;
            onCanPlayCapture?: AppEventHandler<T> | undefined;
            onCanPlayThrough?: AppEventHandler<T> | undefined;
            onCanPlayThroughCapture?: AppEventHandler<T> | undefined;
            onDurationChange?: AppEventHandler<T> | undefined;
            onDurationChangeCapture?: AppEventHandler<T> | undefined;
            onEmptied?: AppEventHandler<T> | undefined;
            onEmptiedCapture?: AppEventHandler<T> | undefined;
            onEncrypted?: AppEventHandler<T> | undefined;
            onEncryptedCapture?: AppEventHandler<T> | undefined;
            onEnded?: AppEventHandler<T> | undefined;
            onEndedCapture?: AppEventHandler<T> | undefined;
            onLoadedData?: AppEventHandler<T> | undefined;
            onLoadedDataCapture?: AppEventHandler<T> | undefined;
            onLoadedMetadata?: AppEventHandler<T> | undefined;
            onLoadedMetadataCapture?: AppEventHandler<T> | undefined;
            onLoadStart?: AppEventHandler<T> | undefined;
            onLoadStartCapture?: AppEventHandler<T> | undefined;
            onPause?: AppEventHandler<T> | undefined;
            onPauseCapture?: AppEventHandler<T> | undefined;
            onPlay?: AppEventHandler<T> | undefined;
            onPlayCapture?: AppEventHandler<T> | undefined;
            onPlaying?: AppEventHandler<T> | undefined;
            onPlayingCapture?: AppEventHandler<T> | undefined;
            onProgress?: AppEventHandler<T> | undefined;
            onProgressCapture?: AppEventHandler<T> | undefined;
            onRateChange?: AppEventHandler<T> | undefined;
            onRateChangeCapture?: AppEventHandler<T> | undefined;
            onResize?: AppEventHandler<T> | undefined;
            onResizeCapture?: AppEventHandler<T> | undefined;
            onSeeked?: AppEventHandler<T> | undefined;
            onSeekedCapture?: AppEventHandler<T> | undefined;
            onSeeking?: AppEventHandler<T> | undefined;
            onSeekingCapture?: AppEventHandler<T> | undefined;
            onStalled?: AppEventHandler<T> | undefined;
            onStalledCapture?: AppEventHandler<T> | undefined;
            onSuspend?: AppEventHandler<T> | undefined;
            onSuspendCapture?: AppEventHandler<T> | undefined;
            onTimeUpdate?: AppEventHandler<T> | undefined;
            onTimeUpdateCapture?: AppEventHandler<T> | undefined;
            onVolumeChange?: AppEventHandler<T> | undefined;
            onVolumeChangeCapture?: AppEventHandler<T> | undefined;
            onWaiting?: AppEventHandler<T> | undefined;
            onWaitingCapture?: AppEventHandler<T> | undefined;

            // MouseEvents
            onAuxClick?: MouseEventHandler<T> | undefined;
            onAuxClickCapture?: MouseEventHandler<T> | undefined;
            onClick?: MouseEventHandler<T> | undefined;
            onClickCapture?: MouseEventHandler<T> | undefined;
            onContextMenu?: MouseEventHandler<T> | undefined;
            onContextMenuCapture?: MouseEventHandler<T> | undefined;
            onDoubleClick?: MouseEventHandler<T> | undefined;
            onDoubleClickCapture?: MouseEventHandler<T> | undefined;
            onDrag?: DragEventHandler<T> | undefined;
            onDragCapture?: DragEventHandler<T> | undefined;
            onDragEnd?: DragEventHandler<T> | undefined;
            onDragEndCapture?: DragEventHandler<T> | undefined;
            onDragEnter?: DragEventHandler<T> | undefined;
            onDragEnterCapture?: DragEventHandler<T> | undefined;
            onDragExit?: DragEventHandler<T> | undefined;
            onDragExitCapture?: DragEventHandler<T> | undefined;
            onDragLeave?: DragEventHandler<T> | undefined;
            onDragLeaveCapture?: DragEventHandler<T> | undefined;
            onDragOver?: DragEventHandler<T> | undefined;
            onDragOverCapture?: DragEventHandler<T> | undefined;
            onDragStart?: DragEventHandler<T> | undefined;
            onDragStartCapture?: DragEventHandler<T> | undefined;
            onDrop?: DragEventHandler<T> | undefined;
            onDropCapture?: DragEventHandler<T> | undefined;
            onMouseDown?: MouseEventHandler<T> | undefined;
            onMouseDownCapture?: MouseEventHandler<T> | undefined;
            onMouseEnter?: MouseEventHandler<T> | undefined;
            onMouseLeave?: MouseEventHandler<T> | undefined;
            onMouseMove?: MouseEventHandler<T> | undefined;
            onMouseMoveCapture?: MouseEventHandler<T> | undefined;
            onMouseOut?: MouseEventHandler<T> | undefined;
            onMouseOutCapture?: MouseEventHandler<T> | undefined;
            onMouseOver?: MouseEventHandler<T> | undefined;
            onMouseOverCapture?: MouseEventHandler<T> | undefined;
            onMouseUp?: MouseEventHandler<T> | undefined;
            onMouseUpCapture?: MouseEventHandler<T> | undefined;

            // Selection Events
            onSelect?: AppEventHandler<T> | undefined;
            onSelectCapture?: AppEventHandler<T> | undefined;

            // Touch Events
            onTouchCancel?: TouchEventHandler<T> | undefined;
            onTouchCancelCapture?: TouchEventHandler<T> | undefined;
            onTouchEnd?: TouchEventHandler<T> | undefined;
            onTouchEndCapture?: TouchEventHandler<T> | undefined;
            onTouchMove?: TouchEventHandler<T> | undefined;
            onTouchMoveCapture?: TouchEventHandler<T> | undefined;
            onTouchStart?: TouchEventHandler<T> | undefined;
            onTouchStartCapture?: TouchEventHandler<T> | undefined;

            // Pointer Events
            onPointerDown?: PointerEventHandler<T> | undefined;
            onPointerDownCapture?: PointerEventHandler<T> | undefined;
            onPointerMove?: PointerEventHandler<T> | undefined;
            onPointerMoveCapture?: PointerEventHandler<T> | undefined;
            onPointerUp?: PointerEventHandler<T> | undefined;
            onPointerUpCapture?: PointerEventHandler<T> | undefined;
            onPointerCancel?: PointerEventHandler<T> | undefined;
            onPointerCancelCapture?: PointerEventHandler<T> | undefined;
            onPointerEnter?: PointerEventHandler<T> | undefined;
            onPointerEnterCapture?: PointerEventHandler<T> | undefined;
            onPointerLeave?: PointerEventHandler<T> | undefined;
            onPointerLeaveCapture?: PointerEventHandler<T> | undefined;
            onPointerOver?: PointerEventHandler<T> | undefined;
            onPointerOverCapture?: PointerEventHandler<T> | undefined;
            onPointerOut?: PointerEventHandler<T> | undefined;
            onPointerOutCapture?: PointerEventHandler<T> | undefined;
            onGotPointerCapture?: PointerEventHandler<T> | undefined;
            onGotPointerCaptureCapture?: PointerEventHandler<T> | undefined;
            onLostPointerCapture?: PointerEventHandler<T> | undefined;
            onLostPointerCaptureCapture?: PointerEventHandler<T> | undefined;

            // UI Events
            onScroll?: UIEventHandler<T> | undefined;
            onScrollCapture?: UIEventHandler<T> | undefined;

            // Wheel Events
            onWheel?: WheelEventHandler<T> | undefined;
            onWheelCapture?: WheelEventHandler<T> | undefined;

            // Animation Events
            onAnimationStart?: AnimationEventHandler<T> | undefined;
            onAnimationStartCapture?: AnimationEventHandler<T> | undefined;
            onAnimationEnd?: AnimationEventHandler<T> | undefined;
            onAnimationEndCapture?: AnimationEventHandler<T> | undefined;
            onAnimationIteration?: AnimationEventHandler<T> | undefined;
            onAnimationIterationCapture?: AnimationEventHandler<T> | undefined;

            // Transition Events
            onTransitionEnd?: TransitionEventHandler<T> | undefined;
            onTransitionEndCapture?: TransitionEventHandler<T> | undefined;

            // Custom
            onToggle?: (e: ToggleEvent) => void;
        }

        export type CSSProperties = CSS.Properties<string | number>;

        // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
        interface AriaAttributes {
            /**
             * Identifies the currently active element
             * when DOM focus is on a composite widget, textbox,
             * group, or application.
             */
            'aria-activedescendant'?: string | undefined;
            /**
             * Indicates whether assistive technologies
             * will present all, or only parts of, the changed
             * region based on the change notifications defined
             * by the aria-relevant attribute.
             */
            'aria-atomic'?: Booleanish | undefined;
            /**
             * Indicates whether inputting text could
             * trigger display of one or more predictions of
             * the user's intended value for an input and specifies
             *  how predictions would be
             * presented if they are made.
             */
            'aria-autocomplete'?:
                | 'none'
                | 'inline'
                | 'list'
                | 'both'
                | undefined;
            /**
             * Indicates an element is being modified and that
             * assistive technologies MAY want to wait until the
             * modifications are complete before exposing them to the user.
             */
            /**
             * Defines a string value that labels the current element,
             *  which is intended to be converted into Braille.
             * @see aria-label.
             */
            'aria-braillelabel'?: string | undefined;
            /**
             * Defines a human-readable, author-localized
             * abbreviated description for the role of an element,
             * which is intended to be converted into Braille.
             * @see aria-roledescription.
             */
            'aria-brailleroledescription'?: string | undefined;
            'aria-busy'?: Booleanish | undefined;
            /**
             * Indicates the current "checked" state of checkboxes,
             * radio buttons, and other widgets.
             * @see aria-pressed @see aria-selected.
             */
            'aria-checked'?: boolean | 'false' | 'mixed' | 'true' | undefined;
            /**
             * Defines the total number of columns in a table,
             * grid, or treegrid.
             * @see aria-colindex.
             */
            'aria-colcount'?: number | undefined;
            /**
             * Defines an element's column index or position
             * with respect to the total number of columns
             * within a table, grid, or treegrid.
             * @see aria-colcount @see aria-colspan.
             */
            'aria-colindex'?: number | undefined;
            /**
             * Defines a human readable text alternative of aria-colindex.
             * @see aria-rowindextext.
             */
            'aria-colindextext'?: string | undefined;
            /**
             * Defines the number of columns spanned by a cell
             * or gridcell within a table, grid, or treegrid.
             * @see aria-colindex @see aria-rowspan.
             */
            'aria-colspan'?: number | undefined;
            /**
             * Identifies the element (or elements) whose contents
             * or presence are controlled by the current element.
             * @see aria-owns.
             */
            'aria-controls'?: string | undefined;
            /**
             * Indicates the element that represents the current
             * item within a container or set of related elements.
             */
            'aria-current'?:
                | boolean
                | 'false'
                | 'true'
                | 'page'
                | 'step'
                | 'location'
                | 'date'
                | 'time'
                | undefined;
            /**
             * Identifies the element (or elements) that describes the object.
             * @see aria-labelledby
             */
            'aria-describedby'?: string | undefined;
            /**
             * Defines a string value that describes or annotates
             * the current element.
             * @see related aria-describedby.
             */
            'aria-description'?: string | undefined;
            /**
             * Identifies the element that provides a detailed,
             * extended description for the object.
             * @see aria-describedby.
             */
            'aria-details'?: string | undefined;
            /**
             * Indicates that the element is perceivable but disabled,
             * so it is not editable or otherwise operable.
             * @see aria-hidden @see aria-readonly.
             */
            'aria-disabled'?: Booleanish | undefined;
            /**
             * Indicates what functions can be performed when a dragged
             * object is released on the drop target.
             * @deprecated in ARIA 1.1
             */
            'aria-dropeffect'?:
                | 'none'
                | 'copy'
                | 'execute'
                | 'link'
                | 'move'
                | 'popup'
                | undefined;
            /**
             * Identifies the element that provides an
             * error message for the object.
             * @see aria-invalid @see aria-describedby.
             */
            'aria-errormessage'?: string | undefined;
            /**
             * Indicates whether the element, or another grouping
             * element it controls, is currently expanded or collapsed.
             */
            'aria-expanded'?: Booleanish | undefined;
            /**
             * Identifies the next element (or elements)
             * in an alternate reading order of content which,
             *  at the user's discretion,
             * allows assistive technology to override the
             * general default of reading in document source order.
             */
            'aria-flowto'?: string | undefined;
            /**
             * Indicates an element's "grabbed" state
             * in a drag-and-drop operation.
             * @deprecated in ARIA 1.1
             */
            'aria-grabbed'?: Booleanish | undefined;
            /**
             * Indicates the availability and type of interactive
             *  popup element, such as menu or dialog, that can be
             * triggered by an element.
             */
            'aria-haspopup'?:
                | boolean
                | 'false'
                | 'true'
                | 'menu'
                | 'listbox'
                | 'tree'
                | 'grid'
                | 'dialog'
                | undefined;
            /**
             * Indicates whether the element is exposed to an accessibility API.
             * @see aria-disabled.
             */
            'aria-hidden'?: Booleanish | undefined;
            /**
             * Indicates the entered value does not conform
             * to the format expected by the application.
             * @see aria-errormessage.
             */
            'aria-invalid'?:
                | boolean
                | 'false'
                | 'true'
                | 'grammar'
                | 'spelling'
                | undefined;
            /**
             * Indicates keyboard shortcuts that an author
             * has implemented to activate or give focus to an element.
             */
            'aria-keyshortcuts'?: string | undefined;
            /**
             * Defines a string value that labels the current element.
             * @see aria-labelledby.
             */
            'aria-label'?: string | undefined;
            /**
             * Identifies the element (or elements) that
             * labels the current element.
             * @see aria-describedby.
             */
            'aria-labelledby'?: string | undefined;
            /**
             * Defines the hierarchical level of an
             * element within a structure.
             */
            'aria-level'?: number | undefined;
            /**
             * Indicates that an element will be updated,
             * and describes the types of updates the user agents,
             *  assistive technologies, and user can expect from
             * the live region.
             */
            'aria-live'?: 'off' | 'assertive' | 'polite' | undefined;
            /** Indicates whether an element is modal when displayed. */
            'aria-modal'?: Booleanish | undefined;
            /**
             * Indicates whether a text box accepts multiple
             * lines of input or only a single line.
             */
            'aria-multiline'?: Booleanish | undefined;
            /**
             * Indicates that the user may select more than
             * one item from the current selectable descendants.
             */
            'aria-multiselectable'?: Booleanish | undefined;
            /**
             * Indicates whether the element's orientation
             * is horizontal, vertical, or unknown/ambiguous.
             */
            'aria-orientation'?: 'horizontal' | 'vertical' | undefined;
            /**
             * Identifies an element (or elements) in order to
             * define a visual, functional, or contextual
             * parent/child relationship
             * between DOM elements where the DOM hierarchy
             * cannot be used to represent the relationship.
             * @see aria-controls.
             */
            'aria-owns'?: string | undefined;
            /**
             * Defines a short hint (a word or short phrase)
             * intended to aid the user with data entry when the
             * control has no value.
             * A hint could be a sample value or a brief description
             * of the expected format.
             */
            'aria-placeholder'?: string | undefined;
            /**
             * Defines an element's number or position
             * in the current set of listitems or treeitems.
             * Not required if all elements in the set are present in the DOM.
             * @see aria-setsize.
             */
            'aria-posinset'?: number | undefined;
            /**
             * Indicates the current "pressed" state of toggle buttons.
             * @see aria-checked @see aria-selected.
             */
            'aria-pressed'?: boolean | 'false' | 'mixed' | 'true' | undefined;
            /**
             * Indicates that the element is not editable,
             * but is otherwise operable.
             * @see aria-disabled.
             */
            'aria-readonly'?: Booleanish | undefined;
            /**
             * Indicates what notifications the user agent will
             * trigger when the accessibility tree within a live region
             * is modified.
             * @see aria-atomic.
             */
            'aria-relevant'?:
                | 'additions'
                | 'additions removals'
                | 'additions text'
                | 'all'
                | 'removals'
                | 'removals additions'
                | 'removals text'
                | 'text'
                | 'text additions'
                | 'text removals'
                | undefined;
            /**
             * Indicates that user input is required on the
             *  element before a form may be submitted.
             */
            'aria-required'?: Booleanish | undefined;
            /**
             * Defines a human-readable, author-localized
             * description for the role of an element.
             */
            'aria-roledescription'?: string | undefined;
            /**
             * Defines the total number of rows in a table, grid, or treegrid.
             * @see aria-rowindex.
             */
            'aria-rowcount'?: number | undefined;
            /**
             * Defines an element's row index or position with
             * respect to the total number of rows within a table,
             * grid, or treegrid.
             * @see aria-rowcount @see aria-rowspan.
             */
            'aria-rowindex'?: number | undefined;
            /**
             * Defines a human readable text alternative of aria-rowindex.
             * @see aria-colindextext.
             */
            'aria-rowindextext'?: string | undefined;
            /**
             * Defines the number of rows spanned by a cell or
             * gridcell within a table, grid, or treegrid.
             * @see aria-rowindex @see aria-colspan.
             */
            'aria-rowspan'?: number | undefined;
            /**
             * Indicates the current "selected" state of various widgets.
             * @see aria-checked @see aria-pressed.
             */
            'aria-selected'?: Booleanish | undefined;
            /**
             * Defines the number of items in the current set of
             * listitems or treeitems. Not required if all elements
             * in the set are present in the DOM.
             * @see aria-posinset.
             */
            'aria-setsize'?: number | undefined;
            /**
             * Indicates if items in a table or grid are sorted
             * in ascending or descending order.
             */
            'aria-sort'?:
                | 'none'
                | 'ascending'
                | 'descending'
                | 'other'
                | undefined;
            /** Defines the maximum allowed value for a range widget. */
            'aria-valuemax'?: number | undefined;
            /** Defines the minimum allowed value for a range widget. */
            'aria-valuemin'?: number | undefined;
            /**
             * Defines the current value for a range widget.
             * @see aria-valuetext.
             */
            'aria-valuenow'?: number | undefined;
            /**
             * Defines the human readable text alternative of
             * aria-valuenow for a range widget.
             */
            'aria-valuetext'?: string | undefined;
        }

        // All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions
        type AriaRole =
            | 'alert'
            | 'alertdialog'
            | 'application'
            | 'article'
            | 'banner'
            | 'button'
            | 'cell'
            | 'checkbox'
            | 'columnheader'
            | 'combobox'
            | 'complementary'
            | 'contentinfo'
            | 'definition'
            | 'dialog'
            | 'directory'
            | 'document'
            | 'feed'
            | 'figure'
            | 'form'
            | 'grid'
            | 'gridcell'
            | 'group'
            | 'heading'
            | 'img'
            | 'link'
            | 'list'
            | 'listbox'
            | 'listitem'
            | 'log'
            | 'main'
            | 'marquee'
            | 'math'
            | 'menu'
            | 'menubar'
            | 'menuitem'
            | 'menuitemcheckbox'
            | 'menuitemradio'
            | 'navigation'
            | 'none'
            | 'note'
            | 'option'
            | 'presentation'
            | 'progressbar'
            | 'radio'
            | 'radiogroup'
            | 'region'
            | 'row'
            | 'rowgroup'
            | 'rowheader'
            | 'scrollbar'
            | 'search'
            | 'searchbox'
            | 'separator'
            | 'slider'
            | 'spinbutton'
            | 'status'
            | 'switch'
            | 'tab'
            | 'table'
            | 'tablist'
            | 'tabpanel'
            | 'term'
            | 'textbox'
            | 'timer'
            | 'toolbar'
            | 'tooltip'
            | 'tree'
            | 'treegrid'
            | 'treeitem';

        type HTMLAttributeReferrerPolicy =
            | ''
            | 'no-referrer'
            | 'no-referrer-when-downgrade'
            | 'origin'
            | 'origin-when-cross-origin'
            | 'same-origin'
            | 'strict-origin'
            | 'strict-origin-when-cross-origin'
            | 'unsafe-url';

        interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
            // App-specific Attributes
            defaultChecked?: boolean | undefined;
            defaultValue?: string | number | readonly string[] | undefined;
            suppressContentEditableWarning?: boolean | undefined;
            suppressHydrationWarning?: boolean | undefined;

            // Standard HTML Attributes
            accessKey?: string | undefined;
            autoFocus?: boolean | undefined;
            className?: string | undefined;
            contentEditable?: Booleanish | 'inherit' | undefined;
            contextMenu?: string | undefined;
            dir?: string | undefined;
            draggable?: Booleanish | undefined;
            hidden?: boolean | undefined;
            id?: string | undefined;
            lang?: string | undefined;
            nonce?: string | undefined;
            placeholder?: string | undefined;
            slot?: string | undefined;
            spellCheck?: Booleanish | undefined;
            style?: string | undefined;
            tabIndex?: number | undefined;
            title?: string | undefined;
            translate?: 'yes' | 'no' | undefined;
            popover?: 'auto' | 'manual' | boolean;

            // Unknown
            radioGroup?: string | undefined; // <command>, <menuitem>

            // WAI-ARIA
            role?: AriaRole | undefined;

            // RDFa Attributes
            about?: string | undefined;
            content?: string | undefined;
            datatype?: string | undefined;
            inlist?: unknown;
            prefix?: string | undefined;
            property?: string | undefined;
            rel?: string | undefined;
            resource?: string | undefined;
            rev?: string | undefined;
            typeof?: string | undefined;
            vocab?: string | undefined;

            // Non-standard Attributes
            autoCapitalize?: string | undefined;
            autoCorrect?: string | undefined;
            autoSave?: string | undefined;
            color?: string | undefined;
            itemProp?: string | undefined;
            itemScope?: boolean | undefined;
            itemType?: string | undefined;
            itemID?: string | undefined;
            itemRef?: string | undefined;
            results?: number | undefined;
            security?: string | undefined;
            unselectable?: 'on' | 'off' | undefined;

            // Living Standard
            /**
             * Hints at the type of data that might be entered
             * by the user while editing the element or its contents
             * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
             */
            inputMode?:
                | 'none'
                | 'text'
                | 'tel'
                | 'url'
                | 'email'
                | 'numeric'
                | 'decimal'
                | 'search'
                | undefined;
            /**
             * Specify that a standard HTML element should behave
             * like a defined custom built-in element
             * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
             */
            is?: string | undefined;

            // Popover
            popoverTarget?: string;
            popoverTargetAction?: 'hide' | 'show' | 'toggle';
        }

        /**
         * inside your component or have to validate them.
         */
        interface RefObject<T> {
            current: T | null;
        }
        // Bivariance hack for consistent unsoundness with RefObject
        type RefCallback<T> = {
            bivarianceHack(instance: T | null): void;
        }['bivarianceHack'];
        type Ref<T> = RefCallback<T> | RefObject<T> | null;

        interface Attributes {
            key?: Key | null | undefined;
        }
        interface RefAttributes<T> extends Attributes {
            /**
             * Allows getting a ref to the component instance.
             * Once the component unmounts, React will set
             * `ref.current` to `null` (or call the ref with `null`
             * if you passed a callback ref).
             * @see https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom
             */
            ref?: Ref<T> | undefined;
        }
        interface ClassAttributes<T> extends Attributes {
            /**
             * Allows getting a ref to the component instance.
             * Once the component unmounts, React will set
             * `ref.current` to `null`
             * (or call the ref with `null` if you passed a callback ref).
             * @see https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom
             */
            ref?: Ref<T> | undefined;
        }

        type DetailedHTMLProps<
            E extends HTMLAttributes<T>,
            T,
        > = ClassAttributes<T> & E;

        type HTMLAttributeAnchorTarget =
            | '_self'
            | '_blank'
            | '_parent'
            | '_top';

        interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
            download?: unknown;
            href?: string | undefined;
            hrefLang?: string | undefined;
            media?: string | undefined;
            ping?: string | undefined;
            target?: HTMLAttributeAnchorTarget | undefined;
            type?: string | undefined;
            referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
        }

        interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
            autoPlay?: boolean | undefined;
            controls?: boolean | undefined;
            controlsList?: string | undefined;
            crossOrigin?: CrossOrigin;
            loop?: boolean | undefined;
            mediaGroup?: string | undefined;
            muted?: boolean | undefined;
            playsInline?: boolean | undefined;
            preload?: string | undefined;
            src?: string | undefined;
        }

        type AudioHTMLAttributes<T> = MediaHTMLAttributes<T>;

        interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
            alt?: string | undefined;
            coords?: string | undefined;
            download?: unknown;
            href?: string | undefined;
            hrefLang?: string | undefined;
            media?: string | undefined;
            referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
            shape?: string | undefined;
            target?: string | undefined;
        }

        interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
            href?: string | undefined;
            target?: string | undefined;
        }

        interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
            cite?: string | undefined;
        }

        interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
            disabled?: boolean | undefined;
            form?: string | undefined;
            formAction?: string | undefined;
            formEncType?: string | undefined;
            formMethod?: string | undefined;
            formNoValidate?: boolean | undefined;
            formTarget?: string | undefined;
            name?: string | undefined;
            type?: 'submit' | 'reset' | 'button' | undefined;
            value?: string | readonly string[] | number | undefined;
        }

        interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
            height?: number | string | undefined;
            width?: number | string | undefined;
        }

        interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
            span?: number | undefined;
            width?: number | string | undefined;
        }

        interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
            span?: number | undefined;
        }

        interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
            value?: string | readonly string[] | number | undefined;
        }

        interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
            open?: boolean | undefined;
            onToggle?: AppEventHandler<T> | undefined;
        }

        interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
            cite?: string | undefined;
            dateTime?: string | undefined;
        }

        interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
            onCancel?: AppEventHandler<T> | undefined;
            onClose?: AppEventHandler<T> | undefined;
            open?: boolean | undefined;
        }

        interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
            height?: number | string | undefined;
            src?: string | undefined;
            type?: string | undefined;
            width?: number | string | undefined;
        }

        interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
            disabled?: boolean | undefined;
            form?: string | undefined;
            name?: string | undefined;
        }

        interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
            acceptCharset?: string | undefined;
            action?: string | undefined;
            autoComplete?: string | undefined;
            encType?: string | undefined;
            method?: string | undefined;
            name?: string | undefined;
            noValidate?: boolean | undefined;
            target?: string | undefined;
        }

        interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
            manifest?: string | undefined;
        }

        interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
            allow?: string | undefined;
            allowFullScreen?: boolean | undefined;
            allowTransparency?: boolean | undefined;
            /** @deprecated */
            frameBorder?: number | string | undefined;
            height?: number | string | undefined;
            loading?: 'eager' | 'lazy' | undefined;
            /** @deprecated */
            marginHeight?: number | undefined;
            /** @deprecated */
            marginWidth?: number | undefined;
            name?: string | undefined;
            referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
            sandbox?: string | undefined;
            /** @deprecated */
            scrolling?: string | undefined;
            seamless?: boolean | undefined;
            src?: string | undefined;
            srcDoc?: string | undefined;
            width?: number | string | undefined;
        }

        interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
            alt?: string | undefined;
            crossOrigin?: CrossOrigin;
            decoding?: 'async' | 'auto' | 'sync' | undefined;
            height?: number | string | undefined;
            loading?: 'eager' | 'lazy' | undefined;
            referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
            sizes?: string | undefined;
            src?: string | undefined;
            srcSet?: string | undefined;
            useMap?: string | undefined;
            width?: number | string | undefined;
        }

        interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
            cite?: string | undefined;
            dateTime?: string | undefined;
        }

        type HTMLInputTypeAttribute =
            | 'button'
            | 'checkbox'
            | 'color'
            | 'date'
            | 'datetime-local'
            | 'email'
            | 'file'
            | 'hidden'
            | 'image'
            | 'month'
            | 'number'
            | 'password'
            | 'radio'
            | 'range'
            | 'reset'
            | 'search'
            | 'submit'
            | 'tel'
            | 'text'
            | 'time'
            | 'url'
            | 'week';

        interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
            accept?: string | undefined;
            alt?: string | undefined;
            autoComplete?: string | undefined;
            capture?: boolean | 'user' | 'environment' | undefined; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
            checked?: boolean | undefined;
            disabled?: boolean | undefined;
            enterKeyHint?:
                | 'enter'
                | 'done'
                | 'go'
                | 'next'
                | 'previous'
                | 'search'
                | 'send'
                | undefined;
            form?: string | undefined;
            formAction?: string | undefined;
            formEncType?: string | undefined;
            formMethod?: string | undefined;
            formNoValidate?: boolean | undefined;
            formTarget?: string | undefined;
            height?: number | string | undefined;
            list?: string | undefined;
            max?: number | string | undefined;
            maxLength?: number | undefined;
            min?: number | string | undefined;
            minLength?: number | undefined;
            multiple?: boolean | undefined;
            name?: string | undefined;
            pattern?: string | undefined;
            placeholder?: string | undefined;
            readOnly?: boolean | undefined;
            required?: boolean | undefined;
            size?: number | undefined;
            src?: string | undefined;
            step?: number | string | undefined;
            type?: HTMLInputTypeAttribute | undefined;
            value?: string | readonly string[] | number | undefined;
            width?: number | string | undefined;

            onChange?: ChangeEventHandler<T> | undefined;
        }

        interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
            challenge?: string | undefined;
            disabled?: boolean | undefined;
            form?: string | undefined;
            keyType?: string | undefined;
            keyParams?: string | undefined;
            name?: string | undefined;
        }

        interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
            form?: string | undefined;
            htmlFor?: string | undefined;
        }

        interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
            value?: string | readonly string[] | number | undefined;
        }

        interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
            as?: string | undefined;
            crossOrigin?: CrossOrigin;
            fetchPriority?: 'high' | 'low' | 'auto';
            href?: string | undefined;
            hrefLang?: string | undefined;
            integrity?: string | undefined;
            media?: string | undefined;
            imageSrcSet?: string | undefined;
            imageSizes?: string | undefined;
            referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
            sizes?: string | undefined;
            type?: string | undefined;
            charSet?: string | undefined;
        }

        interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
            name?: string | undefined;
        }

        interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
            type?: string | undefined;
        }

        interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
            charSet?: string | undefined;
            httpEquiv?: string | undefined;
            name?: string | undefined;
            media?: string | undefined;
            content?: string | undefined;
        }

        interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
            form?: string | undefined;
            high?: number | undefined;
            low?: number | undefined;
            max?: number | string | undefined;
            min?: number | string | undefined;
            optimum?: number | undefined;
            value?: string | readonly string[] | number | undefined;
        }

        interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
            cite?: string | undefined;
        }

        interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
            classID?: string | undefined;
            data?: string | undefined;
            form?: string | undefined;
            height?: number | string | undefined;
            name?: string | undefined;
            type?: string | undefined;
            useMap?: string | undefined;
            width?: number | string | undefined;
            wmode?: string | undefined;
        }

        interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
            reversed?: boolean | undefined;
            start?: number | undefined;
            type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined;
        }

        interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
            disabled?: boolean | undefined;
            label?: string | undefined;
        }

        interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
            disabled?: boolean | undefined;
            label?: string | undefined;
            selected?: boolean | undefined;
            value?: string | readonly string[] | number | undefined;
        }

        interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
            form?: string | undefined;
            htmlFor?: string | undefined;
            name?: string | undefined;
        }

        interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
            name?: string | undefined;
            value?: string | readonly string[] | number | undefined;
        }

        interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
            max?: number | string | undefined;
            value?: string | readonly string[] | number | undefined;
        }

        interface SlotHTMLAttributes<T> extends HTMLAttributes<T> {
            name?: string | undefined;
        }

        interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
            async?: boolean | undefined;
            /** @deprecated */
            charSet?: string | undefined;
            crossOrigin?: CrossOrigin;
            defer?: boolean | undefined;
            integrity?: string | undefined;
            noModule?: boolean | undefined;
            referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
            src?: string | undefined;
            type?: string | undefined;
        }

        interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
            autoComplete?: string | undefined;
            disabled?: boolean | undefined;
            form?: string | undefined;
            multiple?: boolean | undefined;
            name?: string | undefined;
            required?: boolean | undefined;
            size?: number | undefined;
            value?: string | readonly string[] | number | undefined;
            onChange?: ChangeEventHandler<T> | undefined;
        }

        interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
            height?: number | string | undefined;
            media?: string | undefined;
            sizes?: string | undefined;
            src?: string | undefined;
            srcSet?: string | undefined;
            type?: string | undefined;
            width?: number | string | undefined;
        }

        interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
            media?: string | undefined;
            scoped?: boolean | undefined;
            type?: string | undefined;
        }

        interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
            align?: 'left' | 'center' | 'right' | undefined;
            bgcolor?: string | undefined;
            border?: number | undefined;
            cellPadding?: number | string | undefined;
            cellSpacing?: number | string | undefined;
            frame?: boolean | undefined;
            rules?: 'none' | 'groups' | 'rows' | 'columns' | 'all' | undefined;
            summary?: string | undefined;
            width?: number | string | undefined;
        }

        interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
            autoComplete?: string | undefined;
            cols?: number | undefined;
            dirName?: string | undefined;
            disabled?: boolean | undefined;
            form?: string | undefined;
            maxLength?: number | undefined;
            minLength?: number | undefined;
            name?: string | undefined;
            placeholder?: string | undefined;
            readOnly?: boolean | undefined;
            required?: boolean | undefined;
            rows?: number | undefined;
            value?: string | readonly string[] | number | undefined;
            wrap?: string | undefined;

            onChange?: ChangeEventHandler<T> | undefined;
        }

        interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
            align?:
                | 'left'
                | 'center'
                | 'right'
                | 'justify'
                | 'char'
                | undefined;
            colSpan?: number | undefined;
            headers?: string | undefined;
            rowSpan?: number | undefined;
            scope?: string | undefined;
            abbr?: string | undefined;
            height?: number | string | undefined;
            width?: number | string | undefined;
            valign?: 'top' | 'middle' | 'bottom' | 'baseline' | undefined;
        }

        interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
            align?:
                | 'left'
                | 'center'
                | 'right'
                | 'justify'
                | 'char'
                | undefined;
            colSpan?: number | undefined;
            headers?: string | undefined;
            rowSpan?: number | undefined;
            scope?: string | undefined;
            abbr?: string | undefined;
        }

        interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
            dateTime?: string | undefined;
        }

        interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
            default?: boolean | undefined;
            kind?: string | undefined;
            label?: string | undefined;
            src?: string | undefined;
            srcLang?: string | undefined;
        }

        interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
            height?: number | string | undefined;
            playsInline?: boolean | undefined;
            poster?: string | undefined;
            width?: number | string | undefined;
            disablePictureInPicture?: boolean | undefined;
            disableRemotePlayback?: boolean | undefined;
        }

        // The three broad type categories are (in order of restrictiveness):
        //   - "number | string"
        //   - "string"
        //   - union of string literals
        interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
            // App-specific Attributes
            suppressHydrationWarning?: boolean | undefined;

            // Attributes which also defined in HTMLAttributes
            // See comment in SVGDOMPropertyConfig.js
            className?: string | undefined;
            color?: string | undefined;
            height?: number | string | undefined;
            id?: string | undefined;
            lang?: string | undefined;
            max?: number | string | undefined;
            media?: string | undefined;
            method?: string | undefined;
            min?: number | string | undefined;
            name?: string | undefined;
            style?: string | undefined;
            target?: string | undefined;
            type?: string | undefined;
            width?: number | string | undefined;

            // Other HTML properties supported by SVG elements in browsers
            role?: AriaRole | undefined;
            tabIndex?: number | undefined;
            crossOrigin?: CrossOrigin;

            // SVG Specific attributes
            accentHeight?: number | string | undefined;
            accumulate?: 'none' | 'sum' | undefined;
            additive?: 'replace' | 'sum' | undefined;
            alignmentBaseline?:
                | 'auto'
                | 'baseline'
                | 'before-edge'
                | 'text-before-edge'
                | 'middle'
                | 'central'
                | 'after-edge'
                | 'text-after-edge'
                | 'ideographic'
                | 'alphabetic'
                | 'hanging'
                | 'mathematical'
                | 'inherit'
                | undefined;
            allowReorder?: 'no' | 'yes' | undefined;
            alphabetic?: number | string | undefined;
            amplitude?: number | string | undefined;
            arabicForm?:
                | 'initial'
                | 'medial'
                | 'terminal'
                | 'isolated'
                | undefined;
            ascent?: number | string | undefined;
            attributeName?: string | undefined;
            attributeType?: string | undefined;
            autoReverse?: Booleanish | undefined;
            azimuth?: number | string | undefined;
            baseFrequency?: number | string | undefined;
            baselineShift?: number | string | undefined;
            baseProfile?: number | string | undefined;
            bbox?: number | string | undefined;
            begin?: number | string | undefined;
            bias?: number | string | undefined;
            by?: number | string | undefined;
            calcMode?: number | string | undefined;
            capHeight?: number | string | undefined;
            clip?: number | string | undefined;
            clipPath?: string | undefined;
            clipPathUnits?: number | string | undefined;
            clipRule?: number | string | undefined;
            colorInterpolation?: number | string | undefined;
            colorInterpolationFilters?:
                | 'auto'
                | 'sRGB'
                | 'linearRGB'
                | 'inherit'
                | undefined;
            colorProfile?: number | string | undefined;
            colorRendering?: number | string | undefined;
            contentScriptType?: number | string | undefined;
            contentStyleType?: number | string | undefined;
            cursor?: number | string | undefined;
            cx?: number | string | undefined;
            cy?: number | string | undefined;
            d?: string | undefined;
            decelerate?: number | string | undefined;
            descent?: number | string | undefined;
            diffuseConstant?: number | string | undefined;
            direction?: number | string | undefined;
            display?: number | string | undefined;
            divisor?: number | string | undefined;
            dominantBaseline?: number | string | undefined;
            dur?: number | string | undefined;
            dx?: number | string | undefined;
            dy?: number | string | undefined;
            edgeMode?: number | string | undefined;
            elevation?: number | string | undefined;
            enableBackground?: number | string | undefined;
            end?: number | string | undefined;
            exponent?: number | string | undefined;
            externalResourcesRequired?: Booleanish | undefined;
            fill?: string | undefined;
            fillOpacity?: number | string | undefined;
            fillRule?: 'nonzero' | 'evenodd' | 'inherit' | undefined;
            filter?: string | undefined;
            filterRes?: number | string | undefined;
            filterUnits?: number | string | undefined;
            floodColor?: number | string | undefined;
            floodOpacity?: number | string | undefined;
            focusable?: Booleanish | 'auto' | undefined;
            fontFamily?: string | undefined;
            fontSize?: number | string | undefined;
            fontSizeAdjust?: number | string | undefined;
            fontStretch?: number | string | undefined;
            fontStyle?: number | string | undefined;
            fontVariant?: number | string | undefined;
            fontWeight?: number | string | undefined;
            format?: number | string | undefined;
            fr?: number | string | undefined;
            from?: number | string | undefined;
            fx?: number | string | undefined;
            fy?: number | string | undefined;
            g1?: number | string | undefined;
            g2?: number | string | undefined;
            glyphName?: number | string | undefined;
            glyphOrientationHorizontal?: number | string | undefined;
            glyphOrientationVertical?: number | string | undefined;
            glyphRef?: number | string | undefined;
            gradientTransform?: string | undefined;
            gradientUnits?: string | undefined;
            hanging?: number | string | undefined;
            horizAdvX?: number | string | undefined;
            horizOriginX?: number | string | undefined;
            href?: string | undefined;
            ideographic?: number | string | undefined;
            imageRendering?: number | string | undefined;
            in2?: number | string | undefined;
            in?: string | undefined;
            intercept?: number | string | undefined;
            k1?: number | string | undefined;
            k2?: number | string | undefined;
            k3?: number | string | undefined;
            k4?: number | string | undefined;
            k?: number | string | undefined;
            kernelMatrix?: number | string | undefined;
            kernelUnitLength?: number | string | undefined;
            kerning?: number | string | undefined;
            keyPoints?: number | string | undefined;
            keySplines?: number | string | undefined;
            keyTimes?: number | string | undefined;
            lengthAdjust?: number | string | undefined;
            letterSpacing?: number | string | undefined;
            lightingColor?: number | string | undefined;
            limitingConeAngle?: number | string | undefined;
            local?: number | string | undefined;
            markerEnd?: string | undefined;
            markerHeight?: number | string | undefined;
            markerMid?: string | undefined;
            markerStart?: string | undefined;
            markerUnits?: number | string | undefined;
            markerWidth?: number | string | undefined;
            mask?: string | undefined;
            maskContentUnits?: number | string | undefined;
            maskUnits?: number | string | undefined;
            mathematical?: number | string | undefined;
            mode?: number | string | undefined;
            numOctaves?: number | string | undefined;
            offset?: number | string | undefined;
            opacity?: number | string | undefined;
            operator?: number | string | undefined;
            order?: number | string | undefined;
            orient?: number | string | undefined;
            orientation?: number | string | undefined;
            origin?: number | string | undefined;
            overflow?: number | string | undefined;
            overlinePosition?: number | string | undefined;
            overlineThickness?: number | string | undefined;
            paintOrder?: number | string | undefined;
            panose1?: number | string | undefined;
            path?: string | undefined;
            pathLength?: number | string | undefined;
            patternContentUnits?: string | undefined;
            patternTransform?: number | string | undefined;
            patternUnits?: string | undefined;
            pointerEvents?: number | string | undefined;
            points?: string | undefined;
            pointsAtX?: number | string | undefined;
            pointsAtY?: number | string | undefined;
            pointsAtZ?: number | string | undefined;
            preserveAlpha?: Booleanish | undefined;
            preserveAspectRatio?: string | undefined;
            primitiveUnits?: number | string | undefined;
            r?: number | string | undefined;
            radius?: number | string | undefined;
            refX?: number | string | undefined;
            refY?: number | string | undefined;
            renderingIntent?: number | string | undefined;
            repeatCount?: number | string | undefined;
            repeatDur?: number | string | undefined;
            requiredExtensions?: number | string | undefined;
            requiredFeatures?: number | string | undefined;
            restart?: number | string | undefined;
            result?: string | undefined;
            rotate?: number | string | undefined;
            rx?: number | string | undefined;
            ry?: number | string | undefined;
            scale?: number | string | undefined;
            seed?: number | string | undefined;
            shapeRendering?: number | string | undefined;
            slope?: number | string | undefined;
            spacing?: number | string | undefined;
            specularConstant?: number | string | undefined;
            specularExponent?: number | string | undefined;
            speed?: number | string | undefined;
            spreadMethod?: string | undefined;
            startOffset?: number | string | undefined;
            stdDeviation?: number | string | undefined;
            stemh?: number | string | undefined;
            stemv?: number | string | undefined;
            stitchTiles?: number | string | undefined;
            stopColor?: string | undefined;
            stopOpacity?: number | string | undefined;
            strikethroughPosition?: number | string | undefined;
            strikethroughThickness?: number | string | undefined;
            string?: number | string | undefined;
            stroke?: string | undefined;
            strokeDasharray?: string | number | undefined;
            strokeDashoffset?: string | number | undefined;
            strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit' | undefined;
            strokeLinejoin?:
                | 'miter'
                | 'round'
                | 'bevel'
                | 'inherit'
                | undefined;
            strokeMiterlimit?: number | string | undefined;
            strokeOpacity?: number | string | undefined;
            strokeWidth?: number | string | undefined;
            surfaceScale?: number | string | undefined;
            systemLanguage?: number | string | undefined;
            tableValues?: number | string | undefined;
            targetX?: number | string | undefined;
            targetY?: number | string | undefined;
            textAnchor?: string | undefined;
            textDecoration?: number | string | undefined;
            textLength?: number | string | undefined;
            textRendering?: number | string | undefined;
            to?: number | string | undefined;
            transform?: string | undefined;
            u1?: number | string | undefined;
            u2?: number | string | undefined;
            underlinePosition?: number | string | undefined;
            underlineThickness?: number | string | undefined;
            unicode?: number | string | undefined;
            unicodeBidi?: number | string | undefined;
            unicodeRange?: number | string | undefined;
            unitsPerEm?: number | string | undefined;
            vAlphabetic?: number | string | undefined;
            values?: string | undefined;
            vectorEffect?: number | string | undefined;
            version?: string | undefined;
            vertAdvY?: number | string | undefined;
            vertOriginX?: number | string | undefined;
            vertOriginY?: number | string | undefined;
            vHanging?: number | string | undefined;
            vIdeographic?: number | string | undefined;
            viewBox?: string | undefined;
            viewTarget?: number | string | undefined;
            visibility?: number | string | undefined;
            vMathematical?: number | string | undefined;
            widths?: number | string | undefined;
            wordSpacing?: number | string | undefined;
            writingMode?: number | string | undefined;
            x1?: number | string | undefined;
            x2?: number | string | undefined;
            x?: number | string | undefined;
            xChannelSelector?: string | undefined;
            xHeight?: number | string | undefined;
            xlinkActuate?: string | undefined;
            xlinkArcrole?: string | undefined;
            xlinkHref?: string | undefined;
            xlinkRole?: string | undefined;
            xlinkShow?: string | undefined;
            xlinkTitle?: string | undefined;
            xlinkType?: string | undefined;
            xmlBase?: string | undefined;
            xmlLang?: string | undefined;
            xmlns?: string | undefined;
            xmlnsXlink?: string | undefined;
            xmlSpace?: string | undefined;
            y1?: number | string | undefined;
            y2?: number | string | undefined;
            y?: number | string | undefined;
            yChannelSelector?: string | undefined;
            z?: number | string | undefined;
            zoomAndPan?: string | undefined;
        }

        interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {}

        type SVGLineElementAttributes<T> = SVGProps<T>;
        type SVGTextElementAttributes<T> = SVGProps<T>;
    }

    namespace JSX {
        /** Тип, плученный из JSX разметки */
        type Element =
            | AppElement<AppComponentConstructor<object>>
            | AppElement<keyof HTMLElementTagNameMap, HTMLElement>;

        type Node =
            | AppElement<AppComponentConstructor<object>>
            | AppElement<keyof HTMLElementTagNameMap, HTMLElement>
            | string
            | number
            | Iterable<Node>
            | boolean
            | null
            | undefined;

        type Children = AppNode | Iterable<AppNode>;
        // type Element = App.AppElement<unknown, unknown>;
        interface ElementClass extends AppComponent<unknown> {
            render(): Node;
        }
        interface ElementAttributesProperty {
            props: NonNullable<unknown>;
        }

        type IntrinsicAttributes = App.Attributes;
        type IntrinsicClassAttributes<T> = App.ClassAttributes<T>;

        interface IntrinsicElements {
            // HTML
            a: App.DetailedHTMLProps<
                App.AnchorHTMLAttributes<HTMLAnchorElement>,
                HTMLAnchorElement
            >;
            abbr: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            address: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            area: App.DetailedHTMLProps<
                App.AreaHTMLAttributes<HTMLAreaElement>,
                HTMLAreaElement
            >;
            article: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            aside: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            audio: App.DetailedHTMLProps<
                App.AudioHTMLAttributes<HTMLAudioElement>,
                HTMLAudioElement
            >;
            b: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            base: App.DetailedHTMLProps<
                App.BaseHTMLAttributes<HTMLBaseElement>,
                HTMLBaseElement
            >;
            bdi: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            bdo: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            big: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            blockquote: App.DetailedHTMLProps<
                App.BlockquoteHTMLAttributes<HTMLQuoteElement>,
                HTMLQuoteElement
            >;
            body: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLBodyElement>,
                HTMLBodyElement
            >;
            br: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLBRElement>,
                HTMLBRElement
            >;
            button: App.DetailedHTMLProps<
                App.ButtonHTMLAttributes<HTMLButtonElement>,
                HTMLButtonElement
            >;
            canvas: App.DetailedHTMLProps<
                App.CanvasHTMLAttributes<HTMLCanvasElement>,
                HTMLCanvasElement
            >;
            caption: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            center: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            cite: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            code: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            col: App.DetailedHTMLProps<
                App.ColHTMLAttributes<HTMLTableColElement>,
                HTMLTableColElement
            >;
            colgroup: App.DetailedHTMLProps<
                App.ColgroupHTMLAttributes<HTMLTableColElement>,
                HTMLTableColElement
            >;
            data: App.DetailedHTMLProps<
                App.DataHTMLAttributes<HTMLDataElement>,
                HTMLDataElement
            >;
            datalist: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLDataListElement>,
                HTMLDataListElement
            >;
            dd: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            del: App.DetailedHTMLProps<
                App.DelHTMLAttributes<HTMLModElement>,
                HTMLModElement
            >;
            details: App.DetailedHTMLProps<
                App.DetailsHTMLAttributes<HTMLDetailsElement>,
                HTMLDetailsElement
            >;
            dfn: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            dialog: App.DetailedHTMLProps<
                App.DialogHTMLAttributes<HTMLDialogElement>,
                HTMLDialogElement
            >;
            div: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLDivElement>,
                HTMLDivElement
            >;
            dl: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLDListElement>,
                HTMLDListElement
            >;
            dt: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            em: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            embed: App.DetailedHTMLProps<
                App.EmbedHTMLAttributes<HTMLEmbedElement>,
                HTMLEmbedElement
            >;
            fieldset: App.DetailedHTMLProps<
                App.FieldsetHTMLAttributes<HTMLFieldSetElement>,
                HTMLFieldSetElement
            >;
            figcaption: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            figure: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            footer: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            form: App.DetailedHTMLProps<
                App.FormHTMLAttributes<HTMLFormElement>,
                HTMLFormElement
            >;
            h1: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLHeadingElement>,
                HTMLHeadingElement
            >;
            h2: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLHeadingElement>,
                HTMLHeadingElement
            >;
            h3: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLHeadingElement>,
                HTMLHeadingElement
            >;
            h4: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLHeadingElement>,
                HTMLHeadingElement
            >;
            h5: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLHeadingElement>,
                HTMLHeadingElement
            >;
            h6: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLHeadingElement>,
                HTMLHeadingElement
            >;
            head: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLHeadElement>,
                HTMLHeadElement
            >;
            header: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            hgroup: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            hr: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLHRElement>,
                HTMLHRElement
            >;
            html: App.DetailedHTMLProps<
                App.HtmlHTMLAttributes<HTMLHtmlElement>,
                HTMLHtmlElement
            >;
            i: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            iframe: App.DetailedHTMLProps<
                App.IframeHTMLAttributes<HTMLIFrameElement>,
                HTMLIFrameElement
            >;
            img: App.DetailedHTMLProps<
                App.ImgHTMLAttributes<HTMLImageElement>,
                HTMLImageElement
            >;
            input: App.DetailedHTMLProps<
                App.InputHTMLAttributes<HTMLInputElement>,
                HTMLInputElement
            >;
            ins: App.DetailedHTMLProps<
                App.InsHTMLAttributes<HTMLModElement>,
                HTMLModElement
            >;
            kbd: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            keygen: App.DetailedHTMLProps<
                App.KeygenHTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            label: App.DetailedHTMLProps<
                App.LabelHTMLAttributes<HTMLLabelElement>,
                HTMLLabelElement
            >;
            legend: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLLegendElement>,
                HTMLLegendElement
            >;
            li: App.DetailedHTMLProps<
                App.LiHTMLAttributes<HTMLLIElement>,
                HTMLLIElement
            >;
            link: App.DetailedHTMLProps<
                App.LinkHTMLAttributes<HTMLLinkElement>,
                HTMLLinkElement
            >;
            main: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            map: App.DetailedHTMLProps<
                App.MapHTMLAttributes<HTMLMapElement>,
                HTMLMapElement
            >;
            mark: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            menu: App.DetailedHTMLProps<
                App.MenuHTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            menuitem: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            meta: App.DetailedHTMLProps<
                App.MetaHTMLAttributes<HTMLMetaElement>,
                HTMLMetaElement
            >;
            meter: App.DetailedHTMLProps<
                App.MeterHTMLAttributes<HTMLMeterElement>,
                HTMLMeterElement
            >;
            nav: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            noindex: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            noscript: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            object: App.DetailedHTMLProps<
                App.ObjectHTMLAttributes<HTMLObjectElement>,
                HTMLObjectElement
            >;
            ol: App.DetailedHTMLProps<
                App.OlHTMLAttributes<HTMLOListElement>,
                HTMLOListElement
            >;
            optgroup: App.DetailedHTMLProps<
                App.OptgroupHTMLAttributes<HTMLOptGroupElement>,
                HTMLOptGroupElement
            >;
            option: App.DetailedHTMLProps<
                App.OptionHTMLAttributes<HTMLOptionElement>,
                HTMLOptionElement
            >;
            output: App.DetailedHTMLProps<
                App.OutputHTMLAttributes<HTMLOutputElement>,
                HTMLOutputElement
            >;
            p: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLParagraphElement>,
                HTMLParagraphElement
            >;
            param: App.DetailedHTMLProps<
                App.ParamHTMLAttributes<HTMLParamElement>,
                HTMLParamElement
            >;
            picture: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            pre: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLPreElement>,
                HTMLPreElement
            >;
            progress: App.DetailedHTMLProps<
                App.ProgressHTMLAttributes<HTMLProgressElement>,
                HTMLProgressElement
            >;
            q: App.DetailedHTMLProps<
                App.QuoteHTMLAttributes<HTMLQuoteElement>,
                HTMLQuoteElement
            >;
            rp: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            rt: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            ruby: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            s: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            samp: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            search: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            slot: App.DetailedHTMLProps<
                App.SlotHTMLAttributes<HTMLSlotElement>,
                HTMLSlotElement
            >;
            script: App.DetailedHTMLProps<
                App.ScriptHTMLAttributes<HTMLScriptElement>,
                HTMLScriptElement
            >;
            section: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            select: App.DetailedHTMLProps<
                App.SelectHTMLAttributes<HTMLSelectElement>,
                HTMLSelectElement
            >;
            small: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            source: App.DetailedHTMLProps<
                App.SourceHTMLAttributes<HTMLSourceElement>,
                HTMLSourceElement
            >;
            span: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLSpanElement>,
                HTMLSpanElement
            >;
            strong: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            style: App.DetailedHTMLProps<
                App.StyleHTMLAttributes<HTMLStyleElement>,
                HTMLStyleElement
            >;
            sub: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            summary: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            sup: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            table: App.DetailedHTMLProps<
                App.TableHTMLAttributes<HTMLTableElement>,
                HTMLTableElement
            >;
            template: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLTemplateElement>,
                HTMLTemplateElement
            >;
            tbody: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLTableSectionElement>,
                HTMLTableSectionElement
            >;
            td: App.DetailedHTMLProps<
                App.TdHTMLAttributes<HTMLTableDataCellElement>,
                HTMLTableDataCellElement
            >;
            textarea: App.DetailedHTMLProps<
                App.TextareaHTMLAttributes<HTMLTextAreaElement>,
                HTMLTextAreaElement
            >;
            tfoot: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLTableSectionElement>,
                HTMLTableSectionElement
            >;
            th: App.DetailedHTMLProps<
                App.ThHTMLAttributes<HTMLTableHeaderCellElement>,
                HTMLTableHeaderCellElement
            >;
            thead: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLTableSectionElement>,
                HTMLTableSectionElement
            >;
            time: App.DetailedHTMLProps<
                App.TimeHTMLAttributes<HTMLTimeElement>,
                HTMLTimeElement
            >;
            title: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLTitleElement>,
                HTMLTitleElement
            >;
            tr: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLTableRowElement>,
                HTMLTableRowElement
            >;
            track: App.DetailedHTMLProps<
                App.TrackHTMLAttributes<HTMLTrackElement>,
                HTMLTrackElement
            >;
            u: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            ul: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLUListElement>,
                HTMLUListElement
            >;
            var: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            video: App.DetailedHTMLProps<
                App.VideoHTMLAttributes<HTMLVideoElement>,
                HTMLVideoElement
            >;
            wbr: App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            webview: App.DetailedHTMLProps<
                App.WebViewHTMLAttributes<HTMLWebViewElement>,
                HTMLWebViewElement
            >;

            // SVG
            svg: App.SVGProps<SVGSVGElement>;

            animate: App.SVGProps<SVGElement>;
            animateMotion: App.SVGProps<SVGElement>;
            animateTransform: App.SVGProps<SVGElement>;
            circle: App.SVGProps<SVGCircleElement>;
            clipPath: App.SVGProps<SVGClipPathElement>;
            defs: App.SVGProps<SVGDefsElement>;
            desc: App.SVGProps<SVGDescElement>;
            ellipse: App.SVGProps<SVGEllipseElement>;
            feBlend: App.SVGProps<SVGFEBlendElement>;
            feColorMatrix: App.SVGProps<SVGFEColorMatrixElement>;
            feComponentTransfer: App.SVGProps<SVGFEComponentTransferElement>;
            feComposite: App.SVGProps<SVGFECompositeElement>;
            feConvolveMatrix: App.SVGProps<SVGFEConvolveMatrixElement>;
            feDiffuseLighting: App.SVGProps<SVGFEDiffuseLightingElement>;
            feDisplacementMap: App.SVGProps<SVGFEDisplacementMapElement>;
            feDistantLight: App.SVGProps<SVGFEDistantLightElement>;
            feDropShadow: App.SVGProps<SVGFEDropShadowElement>;
            feFlood: App.SVGProps<SVGFEFloodElement>;
            feFuncA: App.SVGProps<SVGFEFuncAElement>;
            feFuncB: App.SVGProps<SVGFEFuncBElement>;
            feFuncG: App.SVGProps<SVGFEFuncGElement>;
            feFuncR: App.SVGProps<SVGFEFuncRElement>;
            feGaussianBlur: App.SVGProps<SVGFEGaussianBlurElement>;
            feImage: App.SVGProps<SVGFEImageElement>;
            feMerge: App.SVGProps<SVGFEMergeElement>;
            feMergeNode: App.SVGProps<SVGFEMergeNodeElement>;
            feMorphology: App.SVGProps<SVGFEMorphologyElement>;
            feOffset: App.SVGProps<SVGFEOffsetElement>;
            fePointLight: App.SVGProps<SVGFEPointLightElement>;
            feSpecularLighting: App.SVGProps<SVGFESpecularLightingElement>;
            feSpotLight: App.SVGProps<SVGFESpotLightElement>;
            feTile: App.SVGProps<SVGFETileElement>;
            feTurbulence: App.SVGProps<SVGFETurbulenceElement>;
            filter: App.SVGProps<SVGFilterElement>;
            foreignObject: App.SVGProps<SVGForeignObjectElement>;
            g: App.SVGProps<SVGGElement>;
            image: App.SVGProps<SVGImageElement>;
            line: App.SVGLineElementAttributes<SVGLineElement>;
            linearGradient: App.SVGProps<SVGLinearGradientElement>;
            marker: App.SVGProps<SVGMarkerElement>;
            mask: App.SVGProps<SVGMaskElement>;
            metadata: App.SVGProps<SVGMetadataElement>;
            mpath: App.SVGProps<SVGElement>;
            path: App.SVGProps<SVGPathElement>;
            pattern: App.SVGProps<SVGPatternElement>;
            polygon: App.SVGProps<SVGPolygonElement>;
            polyline: App.SVGProps<SVGPolylineElement>;
            radialGradient: App.SVGProps<SVGRadialGradientElement>;
            rect: App.SVGProps<SVGRectElement>;
            stop: App.SVGProps<SVGStopElement>;
            switch: App.SVGProps<SVGSwitchElement>;
            symbol: App.SVGProps<SVGSymbolElement>;
            text: App.SVGTextElementAttributes<SVGTextElement>;
            textPath: App.SVGProps<SVGTextPathElement>;
            tspan: App.SVGProps<SVGTSpanElement>;
            use: App.SVGProps<SVGUseElement>;
            view: App.SVGProps<SVGViewElement>;
        }

        interface ElementAttributesProperty<
            T extends HTMLElement | null = null,
        > {
            props?: AppElementProps<T>;
        }

        type ElementChildrenAttribute = GlobalJSXElementChildrenAttribute;
    }
}
