import * as React from 'react';

import { ThreeViewerBase } from '@panorama-viewer/client';

export default class ThreeViewer extends React.Component<any, {}> {
    private base: ThreeViewerBase = new ThreeViewerBase();
    private host: any;

    componentDidMount() {
        this.base.item = this.props.item;
        const canvas = this.host;
        this.base.init(canvas);
        canvas.addEventListener('mousedown', e => this.base.onMouseDown(e));
        canvas.addEventListener('mousemove', e => this.base.onMouseMove(e));
        canvas.addEventListener('mouseup', e => this.base.onMouseUp());
        canvas.addEventListener('mousewheel', e => this.base.onMouseWheel(e));
        canvas.addEventListener('keyup', e => this.base.onKeyUp(e));
        window.addEventListener('resize', e => this.base.onResize(canvas));
    }

    componentWillReceiveProps(props, nextProps) {
        this.base.item = nextProps.item;
    }

    render() {
        return (<div style={{ cursor: 'move' }} ref={host => this.host = host} />);
    }
}