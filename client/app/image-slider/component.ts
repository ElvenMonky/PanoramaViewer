import { Component, EventEmitter, Input, Output } from '@angular/core';

export class Panorama {
    constructor(public src: string) {}
}

@Component({
    selector: 'image-slider',
    templateUrl: 'template.html',
    styleUrls: ['style.css']
})
export class ImageSlider {
    private numItems: number = 4;
    private startIndex: number = 0;
    private visibleItems: Panorama[];
    private selectedItem?: Panorama;

    @Input()
    items: Panorama[]

    @Output()
    selectedItemChanged: EventEmitter<Panorama> = new EventEmitter<Panorama>();

    constructor(items: Panorama[]) {
        this.items = items;
        this.updateVisible();
    }

    private updateVisible(): void {
        this.visibleItems = this.items.slice(this.startIndex, this.startIndex + this.numItems);
    }

    isNextVisible(): boolean {
        return this.startIndex + this.numItems < this.items.length;
    }

    isBackVisible(): boolean {
        return this.startIndex > 0;
    }

    moveNext(): void {
        if (this.isNextVisible()) {
            this.startIndex++;
            this.updateVisible();
        }
    }

    moveBack(): void {
        if (this.isBackVisible()) {
            this.startIndex--;
            this.updateVisible();
        }
    }

    selectItem(item: Panorama): void {
        this.selectedItem = item;
        this.selectedItemChanged.emit(this.selectedItem);
    }
}