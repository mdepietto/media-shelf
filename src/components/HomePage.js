import React, { useState } from 'react'
import MainPage from '../MainPage'
import Auth from './Auth'

const HomePage = () => {

    const [ main, setMain ] = useState(false)
    const [ defaultPage, setDefaultPage ] = useState(true)

    const DefaultPage = () => {
        return (
            <div className='ScreenSaver'>
                <p style={{ fontSize: '80px', margin: '0 0 2rem 0' }}>Media-Shelf</p>
                <ul style={{ justifyContent: 'left' }}>
                    <li style={{ fontSize: '22px', marginBottom: '1.5rem' }}>View your libraries or add notes</li>
                    <li style={{ fontSize: '22px' }}>Hovering shows you how full that library is</li>
                </ul>
            </div>
        )
    }

    return (
        <div>
            <button onClick={ () => {
                setMain(!main)
                setDefaultPage(!defaultPage)
            }}>test</button>
            <Auth />
            { defaultPage && <DefaultPage /> }
            { main && <MainPage /> }
        </div>
    )
}

export default HomePage