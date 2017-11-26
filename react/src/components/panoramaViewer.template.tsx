import * as React from 'react';
import threeViewer from './threeViewer';
import imageSlider from './imageSlider';

export default props => (
<div>
    {props.selectedItem ? (
        <threeViewer item={props.selectedItem}></threeViewer>
    ) : (
        <div><span>Select image: </span><input type="file" accept="image/jpeg" onInput={e => props.fileSelected(e)} /></div>
    )}
    <imageSlider items={props.items} selectedItem={props.selectedItem} selectedItemChange={e => props.selectedItemChange(e)}></imageSlider>
</div>);