import { Component } from '@angular/core';

import { PanoramaViewerBase } from '@panorama-viewer/client';
import { DataAccessService } from "../services/dataAccessService";

@Component({
    selector: 'panoramaViewer',
    templateUrl: './panoramaViewer.html',
    styleUrls: ['./panoramaViewer.scss']
})
export class PanoramaViewer extends PanoramaViewerBase {
    constructor(dataAccessService: DataAccessService) {
        super(dataAccessService);
    }
}
