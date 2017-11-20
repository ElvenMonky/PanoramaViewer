import { JsonController, Get, Put, Body, BadRequestError } from "routing-controllers";
import { Panorama, PanoramaApi } from '@panorama-viewer/model';
import * as fs from 'fs';
import * as uuid from 'uuid/v1';

@JsonController("/panorama")
export class PanoramaController implements PanoramaApi {
    private static dirName = `${__dirname}/../images`;

    @Get("/")
    getAll(): Promise<Panorama[]> {
        return new Promise<Panorama[]>((resolve, reject) => {
            fs.readdir(PanoramaController.dirName, (err, files) => err ? reject(err) : resolve(files.map(x => new Panorama(x))));
        });
    }

    @Put("/")
    add( @Body() imageData: ArrayBuffer): Promise<void> {
        if (!imageData.byteLength) throw new BadRequestError();
        const fileName = `${PanoramaController.dirName}/${uuid()}.jpg`;
        const buffer = new Buffer(imageData);
        return new Promise<void>((resolve, reject) => {
            fs.writeFile(fileName, buffer, err => err ? reject(err) : resolve());
        });
    }
}