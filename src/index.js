import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import { Auth0Provider } from '@auth0/auth0-react'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App';
import Shelf from './components/Shelf';

// const domain = process.env.REACT_APP_AUTH0_DOMAIN
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.render(
    <BrowserRouter>
        <Auth0Provider
            domain='dev-lbwyz5ki.us.auth0.com'
            clientId='wowmgjNAzFo0IryKleVTHsvQZ8x19EPw'
            redirectUri={ window.location.origin }
        >
            <Routes>
                <Route path='/' element={ <App /> } />
                <Route
                    path='books'
                    element={ <Shelf
                        name='book'
                        path='/deleteBook'
                        sortPath='/booksByTitle'
                    /> }
                />
                <Route
                    path='movies'
                    element={ <Shelf
                        name='movie'
                        path='/deleteMovie'
                        sortPath='/moviesByTitle'
                    /> }
                />
            </Routes>
        </Auth0Provider>
    </BrowserRouter>,
    document.getElementById('root')
)