import { Request } from "express";
import { JsonController, Get, Put, Req, BadRequestError } from "routing-controllers";
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
    add(@Req() request: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const result = `${uuid()}.jpg`;
            const fileName = `${PanoramaController.dirName}/${result}`;
            const stream = fs.createWriteStream(fileName);
            request
                .on("error", e => {
                    reject(e);
                })
                .pipe(stream)
                .on("error", e => {
                    reject(e);
                })
                .on("close", () => {
                    resolve(result);
                });
        });
    }
}