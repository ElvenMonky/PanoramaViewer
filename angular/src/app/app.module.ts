import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PanoramaViewer } from './components/panorama-viewer';
import { ImageSlider } from './components/image-slider';
import { ThreeViewer } from './components/three-viewer';

import { DataAccessService } from "./services/DataAccessService";

@NgModule({
    imports: [BrowserModule],
    declarations: [PanoramaViewer, ImageSlider, ThreeViewer],
    providers: [DataAccessService],
    bootstrap: [PanoramaViewer]
})
export class AppModule { }