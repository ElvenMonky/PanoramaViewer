import * as express from 'express';

import { AppController } from './controllers';

const app: express.Application = express();
const port: number = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client'));
app.use('/app', AppController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});