import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
    <Auth0Provider
        domain='dev-anaecjke.us.auth0.com'
        clientId='lXUgspXEEVjxMmlO3rNyTjskiY0hnYPg'
        redirectUri={window.location.origin}>
        <App />
    </Auth0Provider>, 
    document.getElementById('root')
);