import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Panorama } from '../../../common/models/panorama';

@Component({
    selector: 'image-slider',
    templateUrl: './app/image-slider/template.html',
    styleUrls: ['./common.css', './app/image-slider/style.css']
})
export class ImageSlider {
    private _items: Panorama[] = [];
    private numItems: number = 4;
    private startIndex: number = 0;
    private visibleItems: Panorama[];
    private selectedItem?: Panorama;

    get items() {
        return this._items;
    }

    @Input()
    set items(items: Panorama[]) {
        this._items = items;

        if (this.startIndex + this.numItems > this.items.length) {
            this.startIndex = Math.max(0, this.items.length - this.numItems);
        }

        if (items.indexOf(this.selectedItem) == -1) {
            this.selectItem(undefined);
        }

        this.updateVisible();
    }

    @Output()
    updateSelectedItem: EventEmitter<Panorama> = new EventEmitter<Panorama>();

    constructor() { }

    private updateVisible(): void {
        this.visibleItems = this.items.slice(this.startIndex, this.startIndex + this.numItems).concat(new Panorama());
        console.log(`Start index: ${this.startIndex}`);
        console.log(`Items visible: ${JSON.stringify(this.visibleItems)}`);
    }

    isNextVisible(): boolean {
        return this.startIndex + this.numItems < this.items.length;
    }

    isBackVisible(): boolean {
        return this.startIndex > 0;
    }

    moveNext(): void {
        console.log('Move forward');
        if (this.isNextVisible()) {
            this.startIndex++;
            this.updateVisible();
        }
    }

    moveBack(): void {
        console.log('Move backward');
        if (this.isBackVisible()) {
            this.startIndex--;
            this.updateVisible();
        }
    }

    selectItem(item: Panorama): void {
        console.log('Select item');
        this.selectedItem = item;
        this.updateSelectedItem.emit(this.selectedItem);
    }

    addItem(): void {
        console.log('Add item');
        this.selectedItem = null;
        this.updateSelectedItem.emit(this.selectedItem);
    }
}