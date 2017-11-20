import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import * as Swagger from "swagger-client";

import { PanoramaApi } from '@panorama-viewer/model';

@Injectable()
export class DataAccessService {
    private _panoramaApi: BehaviorSubject<PanoramaApi> = new BehaviorSubject(undefined);

    public get panoramaApi(): Observable<PanoramaApi> {
        return this._panoramaApi;
    }

    private getApi(apis: any, tag: string): any {
        const api = Object.keys(apis[tag]).reduce((api, key) => {
            api[key] = (...args: any[]) => new Promise((resolve, reject) => {
                apis[tag][key](undefined, args.length ? { body: args[0] } : undefined).then((x: any) => resolve(x.obj), (x: any) => reject(x));
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