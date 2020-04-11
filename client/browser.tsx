import * as React from 'react';
import { render } from 'react-dom';
import App from './App';

const renderTarget = document.createElement('div');
document.body.appendChild(renderTarget);

render(
  <App/>
  ,renderTarget
)