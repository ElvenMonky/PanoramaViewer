import { Panorama } from '../models/panorama';

export interface PanoramaApi {
    getAll(): Promise<Panorama[]>;
    add(imageData: any): Promise<string>;
}