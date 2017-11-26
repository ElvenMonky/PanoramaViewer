import * as React from 'react';
import * as Style from './imageSlider.scss';

export default props => (
<div>
    {props.canMoveBack && (<button onClick={() => props.moveBack()}></button>)}
    <ul>
    {props.visibleItems.map(item => (
        <li key={item.src}>
            {item && item.src ? (
                <img onClick={() => props.selectItem(item)} src={`images/${item.src}`} />
            ) : (
                <button onClick={() => props.addItem()}></button>
            )}
        </li>
    ))}
    </ul>
    {props.canMoveNext && (<button onClick={() => props.moveNext()}></button>)}
</div>);