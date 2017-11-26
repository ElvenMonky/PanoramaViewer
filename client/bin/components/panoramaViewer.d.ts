import 'rxjs/operators/map';
import { Panorama } from '@panorama-viewer/model';
import { DataAccessServiceBase } from "./../services/dataAccessService";
export declare class PanoramaViewerBase {
    private panoramaApi;
    private _items;
    items: Panorama[];
    private _selectedItem;
    selectedItem: Panorama;
    emitChange: () => void;
    constructor(dataAccessService: DataAccessServiceBase);
    update(): void;
    fileSelected($event: any): void;
}
