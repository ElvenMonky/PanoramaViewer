import 'rxjs/operators/map';
import { Panorama } from '@panorama-viewer/model';
import { DataAccessServiceBase } from "./../services/dataAccessService";
export declare class PanoramaViewerBase {
    private panoramaApi;
    items: Panorama[];
    selectedItem: Panorama;
    constructor(dataAccessService: DataAccessServiceBase);
    update(): void;
    fileSelected($event: any): void;
}
