import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';
import panoramaViewer from './components/panoramaViewer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<panoramaViewer />, document.getElementById('root'));
registerServiceWorker();