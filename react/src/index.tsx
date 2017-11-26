import * as React from 'react';
import * as ReactDOM from 'react-dom';

import PanoramaViewer from './components/panoramaViewer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PanoramaViewer />, document.body);
registerServiceWorker();