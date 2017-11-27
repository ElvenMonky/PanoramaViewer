import { Panorama } from '@panorama-viewer/model';

export class ImageSliderBase {
    private _items: Panorama[] = [];
    private numItems: number = 4;
    private startIndex: number = 0;

    public get visibleItems(): Panorama[] {
        return this._items.slice(this.startIndex, this.startIndex + this.numItems);
    }

    public trackBy(index: number, item: Panorama): string {
        return item.src;
    }

    set items(items: Panorama[]) {
        this._items = [new Panorama()].concat(items);

        if (this.startIndex + this.numItems > this._items.length) {
            this.startIndex = Math.max(0, this._items.length - this.numItems);
            this.refresh();
        }
    }

    selectedItem: Panorama;

    constructor(
        private emitSelectedItem: (value: Panorama) => void,
        private refresh = () => { }
    ) { }

    get canMoveNext(): boolean {
        return this.startIndex + this.numItems < this._items.length;
    }

    get canMoveBack(): boolean {
        return this.startIndex > 0;
    }

    moveNext(): void {
        console.log('Move forward');
        if (this.canMoveNext) {
            this.startIndex++;
            this.refresh();
        }
    }

    moveBack(): void {
        console.log('Move backward');
        if (this.canMoveBack) {
            this.startIndex--;
            this.refresh();
        }
    }

    selectItem(item: Panorama): void {
        console.log('Select item');
        this.emitSelectedItem(this.selectedItem = item);
    }

    addItem(): void {
        console.log('Add item');
        this.emitSelectedItem(this.selectedItem = null);
    }
}
