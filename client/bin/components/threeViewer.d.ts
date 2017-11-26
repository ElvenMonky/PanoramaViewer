import { Panorama } from '@panorama-viewer/model';
export declare class ThreeViewerBase {
    private FOV;
    private Radius;
    private mDelta;
    private longitude;
    private latitude;
    private manualControl;
    private savedX;
    private savedY;
    private savedLongitude;
    private savedLatitude;
    private renderer;
    private scene;
    private camera;
    private url;
    private initialized;
    item: Panorama;
    init(canvas: any): void;
    private updateSource();
    private render();
    onResize(canvas: any): void;
    onMouseDown($event: any): void;
    onMouseMove($event: any): void;
    onMouseUp(): void;
    onMouseWheel($event: any): void;
    onKeyUp($event: any): void;
}
