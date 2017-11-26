import { Panorama } from '@panorama-viewer/model';
export declare class ImageSliderBase {
    private selectedItemChange;
    private _items;
    private numItems;
    private startIndex;
    readonly visibleItems: Panorama[];
    trackBy(index: number, item: Panorama): string;
    items: Panorama[];
    selectedItem: Panorama;
    constructor(selectedItemChange: (value: Panorama) => void);
    readonly canMoveNext: boolean;
    readonly canMoveBack: boolean;
    moveNext(): void;
    moveBack(): void;
    selectItem(item: Panorama): void;
    addItem(): void;
}
