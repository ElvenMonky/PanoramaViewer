import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Panorama } from '@panorama-viewer/model';
import { ImageSliderBase } from '@panorama-viewer/client';

@Component({
    selector: 'imageSlider',
    templateUrl: './imageSlider.html',
    styleUrls: ['./imageSlider.scss']
})
export class ImageSlider extends ImageSliderBase {
    @Input()
    set items(value: Panorama[]) {
        super.items = value;
    }

    @Input()
    set selectedItem(value: Panorama) {
        super.selectedItem = value;
    }

    @Output()
    selectedItemChange: EventEmitter<Panorama> = new EventEmitter<Panorama>();

    constructor() {
        super(value => this.selectedItemChange.emit(value));
    }
}
