import * as THREE from 'three';
export class ThreeViewerBase {
    constructor() {
        this.FOV = 50;
        this.Radius = 1000;
        this.mDelta = 0.1;
        this.longitude = 0;
        this.latitude = 0;
        this.manualControl = false;
        this.initialized = false;
    }
    set item(value) {
        this.url = `images/${value.src}`;
        this.updateSource();
    }
    init(canvas) {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        console.log(`Canvas: ${canvas.clientWidth}, ${canvas.clientHeight}`);
        canvas.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(this.FOV, canvas.clientWidth / canvas.clientHeight, 0.01, this.Radius);
        let target = new THREE.Vector3(this.Radius, 0, 0);
        this.camera.lookAt(target);
        this.camera.zoom = 0.5;
        this.camera.updateProjectionMatrix();
        this.initialized = true;
        this.updateSource();
    }
    updateSource() {
        if (!this.url)
            return;
        new THREE.TextureLoader().load(this.url, texture => {
            let sphere = new THREE.SphereGeometry(this.Radius, 100, 50);
            sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
            let sphereMaterial = new THREE.MeshBasicMaterial();
            sphereMaterial.map = texture;
            var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
            this.scene.add(sphereMesh);
            this.render();
        });
    }
    render() {
        requestAnimationFrame(() => this.render());
        this.latitude = Math.max(-89.99, Math.min(89.99, this.latitude));
        let rLat = THREE.Math.degToRad(90 - this.latitude);
        let sLat = Math.sin(rLat);
        let cLat = Math.cos(rLat);
        let rLon = THREE.Math.degToRad(this.longitude);
        let sLon = Math.sin(rLon);
        let cLon = Math.cos(rLon);
        let target = new THREE.Vector3(0, 0, 0);
        target.x = this.Radius * sLat * cLon;
        target.y = this.Radius * cLat;
        target.z = this.Radius * sLat * sLon;
        this.camera.lookAt(target);
        this.renderer.render(this.scene, this.camera);
    }
    onResize(canvas) {
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    onMouseDown($event) {
        $event.preventDefault();
        this.manualControl = true;
        this.savedX = $event.clientX;
        this.savedY = $event.clientY;
        this.savedLongitude = this.longitude;
        this.savedLatitude = this.latitude;
    }
    onMouseMove($event) {
        if (this.manualControl) {
            this.longitude = (this.savedX - $event.clientX) * 0.1 + this.savedLongitude;
            this.latitude = ($event.clientY - this.savedY) * 0.1 + this.savedLatitude;
        }
    }
    onMouseUp() {
        this.manualControl = false;
    }
    onMouseWheel($event) {
        var delta = Math.max(-1, Math.min(1, ($event.wheelDelta || -$event.detail)));
        this.camera.zoom = Math.max(0.2, Math.min(10, this.camera.zoom * (1 + this.mDelta * delta)));
        this.camera.updateProjectionMatrix();
    }
    onKeyUp($event) {
        if ($event.keyCode == 32) {
            this.camera.zoom = 1;
            this.camera.updateProjectionMatrix();
        }
    }
}
//# sourceMappingURL=threeViewer.js.map