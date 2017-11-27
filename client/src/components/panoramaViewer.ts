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
        this.refresh();
    }

    private _selectedItem: Panorama = null;

    public get selectedItem(): Panorama {
        return this._selectedItem;
    }

    public set selectedItem(value: Panorama) {
        if (this._selectedItem !== value) {
            this._selectedItem = value;
            this.refresh();
        }
    }

    constructor(
        dataAccessService: DataAccessServiceBase,
        private refresh = () => { }
    ) {
        dataAccessService.panoramaApi.subscribe(panoramaApi => {
            this.panoramaApi = panoramaApi;
            this.selectedItem = null;
            
            this.update();
        });
    }

    update(selectedSrc?: string) {
        if (!this.panoramaApi) {
            this.items = [];
            return;
        }

        this.panoramaApi.getAll()
            .then(items => {
                console.log(`Items received: ${JSON.stringify(items)}`);
                this.items = items;
                this.selectedItem = this.items.find(x => x.src === selectedSrc) || (this.items[0] ? this.items[0] : null);
            })
            .catch(error => {
                console.log(`Http error: ${error}`);
                this.items = stubPanoramaData;
                this.selectedItem = this.items.find(x => x.src === selectedSrc) || (this.items[0] ? this.items[0] : null);
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
                    .then(result => this.update(result))
            };
            reader.readAsArrayBuffer(file);
        }
    }
}
