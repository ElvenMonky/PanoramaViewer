import { Observable } from 'rxjs';
import 'rxjs/operators/map';

import { Panorama, PanoramaApi, stubPanoramaData } from '@panorama-viewer/model';
import { DataAccessServiceBase } from "./../services/dataAccessService";

export class PanoramaViewerBase {
    private panoramaApi: PanoramaApi;
    private _items: Panorama[] = [];

    public get items(): Panorama[] {
        return this._items;
    }

    public set items(value: Panorama[]) {
        this._items = value;
        this.emitChange();
    }

    private _selectedItem: Panorama = null;

    public get selectedItem(): Panorama {
        return this._selectedItem;
    }

    public set selectedItem(value: Panorama) {
        this._selectedItem = value;
        this.emitChange();
    }

    public emitChange = () => { };

    constructor(dataAccessService: DataAccessServiceBase) {
        dataAccessService.panoramaApi.subscribe(panoramaApi => {
            this.panoramaApi = panoramaApi;
            this.selectedItem = null;
            
            this.update();
        });
    }

    update() {
        if (!this.panoramaApi) {
            this.items = [];
            return;
        }

        this.panoramaApi.getAll()
            .then(items => {
                console.log(`Items received: ${JSON.stringify(items)}`);
                this.items = items;
                this.selectedItem = this.items[0] ? this.items[0] : null;
            })
            .catch(error => {
                console.log(`Http error: ${error}`);
                this.items = stubPanoramaData;
                this.selectedItem = this.items[0] ? this.items[0] : null;
            });
    }

    fileSelected($event: any) {
        console.log(`File selected: ${$event.target.value}`);
        const file = $event.target.files[0];
        if (file && this.panoramaApi) {
            const reader = new FileReader();
            reader.onload = e => {
                console.log(reader.result);
                console.log((<ArrayBuffer>reader.result).byteLength);
                this.panoramaApi.add(reader.result)
                    .then(() => this.update())
            };
            reader.readAsArrayBuffer(file);
        }
    }
}
