import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Panorama } from '../models/panorama';

@Component({
    selector: 'image-slider',
    templateUrl: './app/image-slider/template.html',
    styleUrls: ['./common.css', './app/image-slider/style.css']
})
export class ImageSlider implements OnInit {
    private numItems: number = 4;
    private startIndex: number = 0;
    private visibleItems: Panorama[];
    private selectedItem?: Panorama;

    @Input()
    items: Panorama[]

    @Output()
    updateSelectedItem: EventEmitter<Panorama> = new EventEmitter<Panorama>();

    constructor() { }

    ngOnInit() {
        this.updateVisible();
    }

    private updateVisible(): void {
        this.visibleItems = this.items.slice(this.startIndex, this.startIndex + this.numItems).concat(new Panorama());
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