import { Component } from '@angular/core';

export class Panorama {
    constructor(public src: string) {}
}

@Component({
    selector: 'panorama-viewer',
    templateUrl: './app/template.html',
    styleUrls: ['./app/style.css']
})
export class AppComponent {
    private items: Panorama[] =
    [
        new Panorama("panorama1.jpg")
    ];
    private selectedItemSrc?: string;

    selectItemChanged(item?: Panorama) {
        this.selectedItemSrc = `images/${item ? item.src : undefined}`;
    }
}