import { Component, Input, AfterViewInit, ElementRef, HostListener } from '@angular/core';

import { Panorama } from '@panorama-viewer/model';
import { ThreeViewerBase } from '@panorama-viewer/client';

@Component({
    selector: 'threeViewer',
    template: '',
    styles: [':host { cursor: move; }']
})
export class ThreeViewer extends ThreeViewerBase implements AfterViewInit {
    @Input()
    set item(value: Panorama) {
        super.item = value;
    }

    constructor(private host: ElementRef) {
        super();
    }

    ngAfterViewInit() {
        super.init(this.host.nativeElement);
    }

    @HostListener('window:resize', ['$event'])
    onResize($event: any) {
        super.onResize(this.host.nativeElement);
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown($event: any) {
        super.onMouseDown($event);
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove($event: any) {
        super.onMouseMove($event);
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp() {
        super.onMouseUp();
    }

    @HostListener('mousewheel', ['$event'])
    onMouseWheel($event: any) {
        super.onMouseWheel($event);
    }

    @HostListener('keyup', ['$event'])
    onKeyUp($event: any) {
        super.onKeyUp($event);
    }
}
