import { Component } from '@angular/core';

import { Panorama } from './models/panorama';

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
    private selectedItem?: Panorama;

    selectItemChanged(item?: Panorama) {
        this.selectedItem = item;
    }
}