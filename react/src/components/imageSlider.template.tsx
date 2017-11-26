import * as React from 'react';
import './imageSlider.scss';

export default props => (
<div className="imageSlider">
    {props.canMoveBack && (<button onClick={() => props.moveBack()} />)}
    <ul>
    {props.visibleItems.map(item => (
        <li key={item.src}>
            {item && item.src ? (
                <img onClick={() => props.selectItem(item)} src={`images/${item.src}`} />
            ) : (
                <button onClick={() => props.addItem()} />
            )}
        </li>
    ))}
    </ul>
    {props.canMoveNext && (<button onClick={() => props.moveNext()} />)}
</div>);