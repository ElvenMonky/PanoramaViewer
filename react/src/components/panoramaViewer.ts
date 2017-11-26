import * as React from 'react';

import Template from './panoramaViewer.template';
import { PanoramaViewerBase, DataAccessServiceBase } from '@panorama-viewer/client';
import { Panorama } from '@panorama-viewer/model';

const dataAccessService = new DataAccessServiceBase();
const base = new PanoramaViewerBase(dataAccessService);

const newProps = {
    fileSelected: base.fileSelected.bind(base),
    items: base.items,
    selectedItem: base.selectedItem,
    selectedItemChange: value => base.selectedItem = value,
    update: base.update
};

export default props => React.createElement(Template, newProps);