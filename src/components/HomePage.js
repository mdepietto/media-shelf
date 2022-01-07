import React from 'react'
import MainPage from '../MainPage'
import DefaultPage from './DefaultPage'
import Loader from './Loader'
import { useAuth0 } from '@auth0/auth0-react'

const HomePage = () => {

    const { isAuthenticated, isLoading } = useAuth0()

    return (
        <div>
            { isLoading && <Loader color={ `rgb(222, 106, 185)` } loading={ isLoading } /> }
            { !isLoading &&
                <div>
                    { !isAuthenticated && <DefaultPage /> }
                    { isAuthenticated &&
                        <MainPage />
                    }
                </div>
            }
        </div>
    )
}

export default HomePage