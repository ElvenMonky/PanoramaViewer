import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/operators/map';

import { Panorama, PanoramaApi, stubPanoramaData } from '@panorama-viewer/model';
import { DataAccessService } from "../services/DataAccessService";

@Component({
    moduleId: module.id,
    selector: 'panorama-viewer',
    templateUrl: './panorama-viewer.html',
    styleUrls: ['./panorama-viewer.scss']
})
export class PanoramaViewer {
    private panoramaApi: PanoramaApi;
    public items: Panorama[] = [];
    public selectedItem: Panorama = null;

    constructor(dataAccessService: DataAccessService) {
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
            })
            .catch(error => {
                console.log(`Http error: ${error}`);
                this.items = stubPanoramaData;
            });
    }

    fileSelected($event: any) {
        console.log(`File selected: ${$event.target.value}`);
        const file = $event.target.files[0];
        if (file && this.panoramaApi) {
            const reader = new FileReader();
            reader.onload = e => {
                this.panoramaApi.add(reader.result)
                    .then(() => this.update())
            };
            reader.readAsArrayBuffer(file);
        }
    }
}
