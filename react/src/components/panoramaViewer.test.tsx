import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PanoramaViewer from './panoramaViewer.template';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PanoramaViewer />, div);
});
