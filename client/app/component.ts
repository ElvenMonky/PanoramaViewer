import { Component } from '@angular/core';

export class Panorama {
    constructor(public src: string) {}
}

@Component({
    selector: 'panorama-viewer',
    templateUrl: './app/template.html',
    styleUrls: ['./common.css']
})
export class AppComponent {
    private items: Panorama[] =
    [
        new Panorama("panorama1.jpg")
    ];
    private selectedItemSrc?: string;

    selectItemChanged(item?: Panorama) {
        this.selectedItemSrc = item ? `images/${item.src}` : undefined;
    }
}