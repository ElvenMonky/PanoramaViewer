import * as React from 'react';

import Template from './panoramaViewer.template';
import { PanoramaViewerBase, DataAccessServiceBase } from '@panorama-viewer/client';

const dataAccessService = new DataAccessServiceBase();

export default class PanoramaViewer extends React.Component<{}, {}> {
    private base: PanoramaViewerBase;

    componentWillMount() {
        this.base = new PanoramaViewerBase(dataAccessService, () => this.setState({}));
    }

    render() {
        return React.createElement(Template, {
            fileSelected: this.base.fileSelected.bind(this.base),
            items: this.base.items,
            selectedItem: this.base.selectedItem,
            selectedItemChange: value => this.base.selectedItem = value,
            update: this.base.update
        });
    }
}