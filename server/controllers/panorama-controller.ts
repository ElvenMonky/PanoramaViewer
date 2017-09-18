import { Router, Request, Response } from 'express';
import { Panorama } from '../../common/models/panorama';
import panoramaData from '../../common/data/panorama';

const router: Router = Router();

router.get("/", (request: Request, response: Response) => {
    let items: Panorama[] = panoramaData;
    response.json(items);
})

export const PanoramaController: Router = router;