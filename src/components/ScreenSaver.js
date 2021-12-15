import React from 'react'

const ScreenSaver = () => {
    return (
        <div className='ScreenSaver'>
            <p style={{ fontSize: '30px', marginBottom: '0' }}>Welcome to</p>
            <p style={{ fontSize: '65px', margin: '0 0 2rem 0' }}>Media-Shelf</p>
            <ul style={{ justifyContent: 'left' }}>
                <li style={{ fontSize: '22px', marginBottom: '1.5rem' }}>View your libraries or add notes</li>
                <li style={{ fontSize: '22px' }}>Hovering shows you how full that library is</li>
            </ul>
        </div>
    )
}

export default ScreenSaver