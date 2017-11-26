import { Panorama } from '@panorama-viewer/model';
export class ImageSliderBase {
    constructor(selectedItemEmitChange) {
        this.selectedItemEmitChange = selectedItemEmitChange;
        this._items = [];
        this.numItems = 4;
        this.startIndex = 0;
    }
    get visibleItems() {
        return this._items.slice(this.startIndex, this.startIndex + this.numItems).concat(new Panorama());
    }
    trackBy(index, item) {
        return item.src;
    }
    set items(items) {
        this._items = items || [];
        if (this.startIndex + this.numItems > this._items.length) {
            this.startIndex = Math.max(0, this._items.length - this.numItems);
        }
    }
    get canMoveNext() {
        return this.startIndex + this.numItems < this._items.length;
    }
    get canMoveBack() {
        return this.startIndex > 0;
    }
    moveNext() {
        console.log('Move forward');
        if (this.canMoveNext) {
            this.startIndex++;
        }
    }
    moveBack() {
        console.log('Move backward');
        if (this.canMoveBack) {
            this.startIndex--;
        }
    }
    selectItem(item) {
        console.log('Select item');
        this.selectedItem = item;
        this.selectedItemEmitChange(this.selectedItem);
    }
    addItem() {
        console.log('Add item');
        this.selectedItem = null;
        this.selectedItemEmitChange(this.selectedItem);
    }
}
//# sourceMappingURL=imageSlider.js.map