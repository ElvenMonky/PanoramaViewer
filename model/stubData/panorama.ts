import { Panorama } from '../models/panorama';

let imageUrls = ["panorama1.jpg", "panorama2.jpg", "panorama3.jpg"];

let data: Panorama[] = imageUrls.map((imageUrl) => new Panorama(imageUrl));

export default data;