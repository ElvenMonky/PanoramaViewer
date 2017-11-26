import * as React from 'react';
import * as ReactDOM from 'react-dom';
import panoramaViewer from './panoramaViewer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<panoramaViewer />, div);
});
