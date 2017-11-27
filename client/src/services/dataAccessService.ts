import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import * as Swagger from "swagger-client";

import { PanoramaApi } from '@panorama-viewer/model';

export class DataAccessServiceBase {
    private _panoramaApi: BehaviorSubject<PanoramaApi> = new BehaviorSubject(undefined);

    public get panoramaApi(): Observable<PanoramaApi> {
        return this._panoramaApi;
    }

    private convert(tag: string, key: string, ...args: any[]) {
    }

    private convertBody(tag: string, key: string, ...args: any[]) {
        switch (tag) {
            case "panorama":
                switch (key) {
                    case "add":
                        return { requestBody: args[0] };
                }
        }
    }

    private getApi(apis: any, tag: string): any {
        const api = Object.keys(apis[tag]).reduce((api, key) => {
            api[key] = (...args: any[]) => new Promise((resolve, reject) => {
                const params = this.convert(tag, key, ...args);
                const opts = this.convertBody(tag, key, ...args);
                apis[tag][key](params, opts).then((x: any) => resolve(x.obj), (x: any) => reject(x));
            });
            return api;
        }, {});
        return api;
    }

    constructor() {
        Swagger('./openapi.yaml').then((client: any) => {
            this._panoramaApi.next(this.getApi(client.apis, 'panorama'));
        });
    }
}