import React from 'react'
import MainPage from '../MainPage'
import Auth from './Auth'
import PropagateLoader from "react-spinners/PropagateLoader"
import { css } from "@emotion/react"

import { useAuth0 } from '@auth0/auth0-react'

const HomePage = () => {

    const { isAuthenticated, isLoading } = useAuth0()

    const override = css`
        position: fixed;
        top: 50%;
        left: 50%;
    `

    const Loader = () => {
        return (
            <PropagateLoader
                color={ `#FFFFFF` }
                css={ override }
                loading={ isLoading }
                size={ 30 }
            />
        )
    }

    const DefaultPage = () => {
        return (
            <div className='ScreenSaver'>
                <p style={{ fontSize: '80px', margin: '0 0 2rem 0' }}>Media-Shelf</p>
                <ul style={{ justifyContent: 'left' }}>
                    <li style={{ fontSize: '22px', marginBottom: '1.5rem' }}>A note-taking app for books, movies, and shows</li>
                </ul>
            </div>
        )
    }

    return (
        <div>
            { isLoading && <Loader /> }
            { !isLoading &&
                <div> 
                    <Auth />
                    { !isAuthenticated && <DefaultPage /> }
                    { isAuthenticated && <MainPage /> }
                </div>
            }
        </div>
    )
}

export default HomePage