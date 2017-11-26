import { Observable } from "rxjs/Observable";
import { PanoramaApi } from '@panorama-viewer/model';
export declare class DataAccessServiceBase {
    private _panoramaApi;
    readonly panoramaApi: Observable<PanoramaApi>;
    private getApi(apis, tag);
    constructor();
}
