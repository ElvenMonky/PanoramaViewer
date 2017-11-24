import "reflect-metadata";
import * as express from 'express';
import { createExpressServer } from "routing-controllers";
import { PanoramaController } from "./controllers/panorama";

var app = createExpressServer({
    routePrefix: "/api",
    controllers: [__dirname + "/controllers/*.js"]
});
app.use(express.static(__dirname + '/openapi'));
app.use(express.static(__dirname + '/client'));
app.use('/images', express.static(__dirname + '/images'));

const port: number = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});