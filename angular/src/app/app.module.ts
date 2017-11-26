import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PanoramaViewer } from './components/panoramaViewer';
import { ImageSlider } from './components/imageSlider';
import { ThreeViewer } from './components/threeViewer';

import { DataAccessService } from "./services/dataAccessService";

@NgModule({
    imports: [BrowserModule],
    declarations: [PanoramaViewer, ImageSlider, ThreeViewer],
    providers: [DataAccessService],
    bootstrap: [PanoramaViewer]
})
export class AppModule { }