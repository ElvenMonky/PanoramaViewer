import * as React from 'react';
import ThreeViewer from './threeViewer';
import ImageSlider from './imageSlider';
import './panoramaViewer.scss';

export default props => (
<div className="panoramaViewer">
    {props.selectedItem ? (
        <ThreeViewer item={props.selectedItem} />
    ) : (
        <div><span>Select image: </span><input type="file" accept="image/jpeg" onChange={e => props.fileSelected(e)} /></div>
    )}
    <ImageSlider items={props.items} selectedItem={props.selectedItem} selectedItemChange={e => props.selectedItemChange(e)} />
</div>);