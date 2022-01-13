import React, { useState } from 'react'

import ShelfForm from '../components/ShelfForm'
import Sort from '../components/Sort'
import Shelf from '../components/Shelf'
import NavTop from '../components/NavTop'
import NavBottom from '../components/NavBottom'

const ShelfPage = (props) => {

    const [ library, setLibrary ] = useState([])

    const [ shelfForm, setShelfForm ] = useState(false)

    if (props.name === 'books') {
        return (
            <div className='body'>
                <button onClick={() => setShelfForm(!shelfForm)}>Add Book</button>

                { shelfForm && <ShelfForm name='books' path='/addBook' border='2px solid rgb(202, 237, 114)' /> }

                <Sort border='202, 237, 114' library={ library } setLibrary={ setLibrary } />
                <Shelf name='books' library={ library } setLibrary={ setLibrary } />
                <NavTop />
                <NavBottom />
            </div>
        )
    }
    if (props.name === 'movies') {
        return (
            <div className='body'>
                <button onClick={() => setShelfForm(!shelfForm)}>Add Movie</button>

                { shelfForm && <ShelfForm name='movies' path='/addMovie' border='2px solid rgb(235, 229, 52)' /> }

                <Sort border='235, 229, 52' library={ library } setLibrary={ setLibrary } />
                <Shelf name='movies' library={ library } setLibrary={ setLibrary } />
                <NavTop />
                <NavBottom />
            </div>
        )
    }
    if (props.name === 'shows') {
        return (
            <div className='body'>
                <button onClick={() => setShelfForm(!shelfForm)}>Add Show</button>

                { shelfForm && <ShelfForm name='shows' path='/addShow' border='2px solid rgb(242, 129, 7)' /> }

                <Sort border='242, 129, 7' library={ library } setLibrary={ setLibrary } />
                <Shelf name='shows' library={ library } setLibrary={ setLibrary } />
                <NavTop />
                <NavBottom />
            </div>
        )
    }
}

export default ShelfPage