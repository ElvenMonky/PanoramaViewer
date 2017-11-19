import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { PanoramaViewer } from './components/panorama-viewer';
import { ImageSlider } from './components/image-slider';
import { ThreeViewer } from './components/three-viewer';

import { DataAccessService } from "./services/DataAccessService";

@NgModule({
    imports: [BrowserModule, HttpClientModule],
    declarations: [PanoramaViewer, ImageSlider, ThreeViewer],
    providers: [DataAccessService],
    bootstrap: [PanoramaViewer]
})
export class AppModule { }