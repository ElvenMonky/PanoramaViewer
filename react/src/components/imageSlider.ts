import * as React from 'react';

import Template from './imageSlider.template';
import { Panorama } from '@panorama-viewer/model';
import { ImageSliderBase } from '@panorama-viewer/client';

interface ImageSliderProps {
    items: Panorama[];
    selectedItem: Panorama;
    selectedItemChange: (value: Panorama) => void;
}

export default class ImageSlider extends React.Component<ImageSliderProps, {}> {
    private base: ImageSliderBase;

    componentWillMount() {
        this.base = new ImageSliderBase(value => this.props.selectedItemChange(value), () => this.setState({}));
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(props) {
        this.base.items = props.items;
        this.base.selectedItem = props.selectedItem;
    }

    render() {
        return React.createElement(Template, {
            addItem: this.base.addItem.bind(this.base),
            canMoveBack: this.base.canMoveBack,
            canMoveNext: this.base.canMoveNext,
            items: this.base.items,
            moveBack: this.base.moveBack.bind(this.base),
            moveNext: this.base.moveNext.bind(this.base),
            selectedItem: this.base.selectedItem,
            selectItem: this.base.selectItem.bind(this.base),
            trackBy: this.base.trackBy.bind(this.base),
            visibleItems: this.base.visibleItems,
        });
    }
}