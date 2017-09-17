import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './component';
import { ImageSlider } from './image-slider/component';
import { ThreeViewer } from './three-viewer/component';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, ImageSlider, ThreeViewer],
    bootstrap: [AppComponent]
})
export class AppModule { }