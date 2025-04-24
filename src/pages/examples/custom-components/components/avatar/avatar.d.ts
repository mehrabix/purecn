type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AvatarShape = 'circle' | 'square';
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | 'none';
export declare class AvatarComponent extends HTMLElement {
    private shadow;
    private static styles;
    constructor();
    static get observedAttributes(): string[];
    get src(): string;
    get alt(): string;
    get size(): AvatarSize;
    get shape(): AvatarShape;
    get fallback(): string;
    get status(): AvatarStatus;
    get delayMs(): number;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    private handleError;
    private render;
}
export {};
//# sourceMappingURL=avatar.d.ts.map