type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
export declare class ButtonComponent extends HTMLElement {
    private shadow;
    private static styles;
    constructor();
    static get observedAttributes(): string[];
    get variant(): ButtonVariant;
    get size(): ButtonSize;
    get disabled(): boolean;
    get loading(): boolean;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    private render;
}
export {};
//# sourceMappingURL=button.d.ts.map