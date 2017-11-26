import 'rxjs/operators/map';
import { stubPanoramaData } from '@panorama-viewer/model';
export class PanoramaViewerBase {
    constructor(dataAccessService) {
        this._items = [];
        this._selectedItem = null;
        this.emitChange = () => { };
        dataAccessService.panoramaApi.subscribe(panoramaApi => {
            this.panoramaApi = panoramaApi;
            this.selectedItem = null;
            this.update();
        });
    }
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
        this.emitChange();
    }
    get selectedItem() {
        return this._selectedItem;
    }
    set selectedItem(value) {
        this._selectedItem = value;
        this.emitChange();
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
    fileSelected($event) {
        console.log(`File selected: ${$event.target.value}`);
        const file = $event.target.files[0];
        if (file && this.panoramaApi) {
            const reader = new FileReader();
            reader.onload = e => {
                console.log(reader.result);
                console.log(reader.result.byteLength);
                this.panoramaApi.add(reader.result)
                    .then(() => this.update());
            };
            reader.readAsArrayBuffer(file);
        }
    }
}
//# sourceMappingURL=panoramaViewer.js.map