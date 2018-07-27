import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux';

import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import configureStore from './store';

const store = configureStore();

ReactDOM.render((
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReduxProvider>
), document.getElementById('root'));

unregister();
