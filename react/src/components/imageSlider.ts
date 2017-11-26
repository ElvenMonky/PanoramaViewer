import * as React from 'react';

import Template from './imageSlider.template';
import { ImageSliderBase } from '@panorama-viewer/client';

export default props => {
    const base = new ImageSliderBase(value => props.selectedItemChange(value));
    base.items = props.items;
    base.selectedItem = props.selectedItem;
    const newProps = {
        addItem: base.addItem.bind(base),
        canMoveBack: base.canMoveBack,
        canMoveNext: base.canMoveNext,
        items: base.items,
        moveBack: base.moveBack.bind(base),
        moveNext: base.moveNext.bind(base),
        selectedItem: base.selectedItem,
        selectItem: base.selectItem.bind(base),
        trackBy: base.trackBy.bind(base),
        visibleItems: base.visibleItems,
    };
    return React.createElement(Template, newProps);
};