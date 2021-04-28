import React from 'react';
import ReactDOM from 'react-dom';

import {SnackbarProvider} from 'notistack';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <SnackbarProvider maxSnack={3} anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
    preventDuplicate: true
  }}><App/></SnackbarProvider>,
  document.getElementById('root')
);

reportWebVitals();
