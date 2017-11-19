import { JsonController, Get, Put, Body } from "routing-controllers";
import { Panorama, PanoramaApi } from '@panorama-viewer/model';
import * as fs from 'fs';
import * as uuid from 'uuid/v1';

@JsonController("/panorama")
export class PanoramaController implements PanoramaApi {
    private static dirName = `${__dirname}/../../../angular/bin/images`;

    @Get("/")
    getAll(): Promise<Panorama[]> {
        return new Promise<Panorama[]>((resolve, reject) => {
            fs.readdir(PanoramaController.dirName, (err, files) => err ? reject(err) : resolve(files.map(x => new Panorama(x))));
        });
    }

    @Put("/")
    add( @Body() imageData: ArrayBuffer): Promise<void> {
        const fileName = `${PanoramaController.dirName}/${uuid()}.jpg`;
        return new Promise<void>((resolve, reject) => {
            fs.writeFile(fileName, imageData, 'binary', err => err ? reject(err) : resolve());
        });
    }
}