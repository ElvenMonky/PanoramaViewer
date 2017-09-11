import { Component } from '@angular/core';

export class Panorama {
    constructor(public src: string) {}
}

@Component({
    selector: 'panorama-viewer',
    template: `
    <ul>
        <li *ngFor="let item of items">
            <img src="{{item.src}}" />
        </li>
    </ul>`
})
export class AppComponent {
    items: Panorama[] =
    [
        { src: "panorama1.png" }
    ];
}