import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Panorama } from '@panorama-viewer/model';

@Component({
    moduleId: module.id,
    selector: 'image-slider',
    templateUrl: './image-slider.html',
    styleUrls: ['./image-slider.scss']
})
export class ImageSlider {
    private _items: Panorama[] = [];
    private numItems: number = 4;
    private startIndex: number = 0;

    public get visibleItems(): Panorama[] {
        return this._items.slice(this.startIndex, this.startIndex + this.numItems).concat(new Panorama());
    }

    public trackBy(index: number, item: Panorama): string {
        return item.src;
    }

    @Input()
    set items(items: Panorama[]) {
        this._items = items || [];

        if (this.startIndex + this.numItems > this._items.length) {
            this.startIndex = Math.max(0, this._items.length - this.numItems);
        }

        if (this._items.indexOf(this.selectedItem) == -1) {
            this.selectItem(null);
        }
    }

    @Input()
    selectedItem: Panorama;

    @Output()
    selectedItemChange: EventEmitter<Panorama> = new EventEmitter<Panorama>();

    constructor() { }

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
        }
    }

    moveBack(): void {
        console.log('Move backward');
        if (this.canMoveBack) {
            this.startIndex--;
        }
    }

    selectItem(item: Panorama): void {
        console.log('Select item');
        this.selectedItem = item;
        this.selectedItemChange.emit(this.selectedItem);
    }

    addItem(): void {
        console.log('Add item');
        this.selectedItem = null;
        this.selectedItemChange.emit(this.selectedItem);
    }
}
