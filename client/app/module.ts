import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './component';
import { ImageSlider } from './image-slider/component';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, ImageSlider],
    bootstrap: [AppComponent]
})
export class AppModule { }