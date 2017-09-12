import { Component } from '@angular/core';

export class Panorama {
    constructor(public src: string) {}
}

@Component({
    selector: 'panorama-viewer',
    template: `
    <image-slider [items]="items" (selectedItem)="selectItemChanged" />`
})
export class AppComponent {
    private items: Panorama[] =
    [
        { src: "panorama1.png" }
    ];
    private selectedItem?: Panorama;

    selectItemChanged(item?: Panorama) {
        this.selectedItem = item;
    }
}