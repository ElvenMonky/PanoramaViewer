import { Panorama } from '../models/panorama';

let imageUrls = ["panorama1.jpg"];

let data: Panorama[] = imageUrls.map((imageUrl) => new Panorama(imageUrl));

export default data;