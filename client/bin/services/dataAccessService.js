import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as Swagger from "swagger-client";
export class DataAccessServiceBase {
    constructor() {
        this._panoramaApi = new BehaviorSubject(undefined);
        Swagger('./openapi.yaml').then((client) => {
            this._panoramaApi.next(this.getApi(client.apis, 'panorama'));
        });
    }
    get panoramaApi() {
        return this._panoramaApi;
    }
    getApi(apis, tag) {
        const api = Object.keys(apis[tag]).reduce((api, key) => {
            api[key] = (...args) => new Promise((resolve, reject) => {
                apis[tag][key](undefined, args.length ? { body: args[0] } : undefined).then((x) => resolve(x.obj), (x) => reject(x));
            });
            return api;
        }, {});
        return api;
    }
}
//# sourceMappingURL=dataAccessService.js.map