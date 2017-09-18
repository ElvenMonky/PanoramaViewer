import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Panorama } from '../../common/models/panorama';
import panoramaData from '../../common/data/panorama';

@Component({
    selector: 'panorama-viewer',
    templateUrl: './app/template.html',
    styleUrls: ['./common.css']
})
export class AppComponent implements OnInit {
    private items: Panorama[] = [];
    private selectedItem?: Panorama;

    constructor(private http: Http) { }

    ngOnInit() {
        this.http.get('/panorama')
            .map((response: Response) => response.json())
            .subscribe(
            (items: Panorama[]) => {
                console.log(`Items received: ${JSON.stringify(items)}`);
                this.items = items;
            },
            (error: Error) => {
                console.log(`Http error: ${error}`);
                this.items = panoramaData;
            });
    }

    selectItemChanged(item?: Panorama) {
        this.selectedItem = item;
    }
}