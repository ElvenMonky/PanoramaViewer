import * as express from 'express';

import { PanoramaController } from './controllers';

const app: express.Application = express();
const port: number = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client'));
app.use('/common', express.static(__dirname + '/../common'));
app.use('/panorama', PanoramaController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});