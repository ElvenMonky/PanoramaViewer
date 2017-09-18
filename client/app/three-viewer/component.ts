import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

import { Panorama } from '../../../common/models/panorama';

@Component({
    selector: 'three-viewer',
    templateUrl: './app/three-viewer/template.html',
    styleUrls: ['./common.css']
})
export class ThreeViewer implements AfterViewInit {
    @ViewChild('container') container: ElementRef;

    private FOV: number = 50;
    private Radius: number = 1000;
    private mDelta: number = 0.1;

    private longitude: number = 0;
    private latitude: number = 0;

    private manualControl = false;
    private savedX: any;
    private savedY: any;
    private savedLongitude: any;
    private savedLatitude: any;

    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;

    @Input()
    item: Panorama;

    constructor() { }

    ngAfterViewInit() {
        let src = `images/${this.item.src}`;
        let canvas = this.container.nativeElement;

        // setting up the renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        console.log(`Canvas: ${canvas.clientWidth}, ${canvas.clientHeight}`);
        canvas.appendChild(this.renderer.domElement);

        // creating a new scene
        this.scene = new THREE.Scene();

        // adding a camera
        this.camera = new THREE.PerspectiveCamera(this.FOV, canvas.clientWidth / canvas.clientHeight, 0.01, this.Radius);
        let target = new THREE.Vector3(this.Radius, 0, 0);
        this.camera.lookAt(target);
        this.camera.zoom = 0.5;

        new THREE.TextureLoader().load(src, (texture) => {
            // creation of a big sphere geometry
            let sphere = new THREE.SphereGeometry(this.Radius, 100, 50);
            sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

            // creation of the sphere material
            let sphereMaterial = new THREE.MeshBasicMaterial();
            sphereMaterial.map = texture;

            // geometry + material = mesh (actual object)
            var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
            this.scene.add(sphereMesh);

            this.render();
        });
    }

    private render() {
        // calling again render function
        requestAnimationFrame(() => this.render());

        // limiting latitude from -89 to 89 (cannot point to the sky or under your feet)
        this.latitude = Math.max(-89.99, Math.min(89.99, this.latitude));
        let rLat: number = THREE.Math.degToRad(90 - this.latitude);
        let sLat: number = Math.sin(rLat);
        let cLat: number = Math.cos(rLat);
        let rLon: number = THREE.Math.degToRad(this.longitude);
        let sLon: number = Math.sin(rLon);
        let cLon: number = Math.cos(rLon);

        // moving the camera according to current latitude (vertical movement) and longitude (horizontal movement)
        let target = new THREE.Vector3(0, 0, 0);
        target.x = this.Radius * sLat * cLon;
        target.y = this.Radius * cLat;
        target.z = this.Radius * sLat * sLon;
        this.camera.lookAt(target);

        // rendering
        this.renderer.render(this.scene, this.camera);
    }

    // when the mouse is pressed, we switch to manual control and save current coordinates
    onMouseDown($event: any) {
        console.log('Mouse down');
        $event.preventDefault();
        this.manualControl = true;
        this.savedX = $event.clientX;
        this.savedY = $event.clientY;
        this.savedLongitude = this.longitude;
        this.savedLatitude = this.latitude;
        console.log('Mouse down finished');
    }

    // when the mouse moves, if in manual contro we adjust coordinates
    onMouseMove($event: any) {
        console.log('Mouse move');
        if (this.manualControl) {
            this.longitude = (this.savedX - $event.clientX) * 0.1 + this.savedLongitude;
            this.latitude = ($event.clientY - this.savedY) * 0.1 + this.savedLatitude;
        }
    }

    // when the mouse is released, we turn manual control off
    onMouseUp() {
        console.log('Mouse up');
        this.manualControl = false;
    }

    // when the mouse is released, we turn manual control off
    onMouseWheel($event: any) {
        console.log('Mouse wheel');
        var delta = Math.max(-1, Math.min(1, ($event.wheelDelta || -$event.detail)));
        this.camera.zoom = Math.max(0.2, Math.min(10, this.camera.zoom * (1 + this.mDelta * delta)));
        this.camera.updateProjectionMatrix();
    }

    // pressing a key (actually releasing it) changes the texture map
    onKeyUp($event: any) {
        if ($event.keyCode == 32) {
            this.camera.zoom = 1;
            this.camera.updateProjectionMatrix();
        }
    }
}