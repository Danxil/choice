import React from 'react';
import 'whatwg-fetch'
import { render } from 'react-snapshot';
import 'antd/dist/antd.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'flag-icon-css/css/flag-icon.css';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
