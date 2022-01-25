import React, { useState } from 'react'

import HomeButton from '../components/HomeButton'
import ShelfForm from '../components/ShelfForm'
import Sort from '../components/Sort'
import Shelf from '../components/Shelf'
import NavTop from '../components/NavTop'
import NavBottom from '../components/NavBottom'

const ShelfPage = (props) => {

    const [ library, setLibrary ] = useState([])

    const [ shelf, setShelf ] = useState(true)
    const [ shelfForm, setShelfForm ] = useState(false)

    if (props.name === 'books') {
        return (
            <div className='body'>
                { shelfForm && <ShelfForm
                    name='books'
                    path='/addBook'
                    border='2px solid rgb(202, 237, 114)'
                    shelf={ shelf }
                    setShelf={ setShelf }
                    shelfForm={ shelfForm }
                    setShelfForm={ setShelfForm }
                /> }

                { shelf && <div>
                    <Sort
                        border='202, 237, 114'
                        library={ library }
                        setLibrary={ setLibrary }
                        shelfForm={ shelfForm }
                        setShelfForm={ setShelfForm }
                        button='olive'
                        shelf={ shelf }
                        setShelf={ setShelf }
                    />
                    <Shelf
                        name='books'
                        library={ library }
                        setLibrary={ setLibrary }
                    />
                    
                    <NavTop />
                    <NavBottom />
                </div> }
                <HomeButton />
            </div>
        )
    }
    if (props.name === 'movies') {
        return (
            <div className='body'>

                { shelfForm && <ShelfForm
                    name='movies'
                    path='/addMovie'
                    border='2px solid rgb(235, 229, 52)'
                    shelf={ shelf }
                    setShelf={ setShelf }
                    shelfForm={ shelfForm }
                    setShelfForm={ setShelfForm }
                /> }

                { shelf && <div>
                    <Sort
                        border='235, 229, 52'
                        library={ library }
                        setLibrary={ setLibrary }
                        shelfForm={ shelfForm }
                        setShelfForm={ setShelfForm }
                        button='yellow'
                        shelf={ shelf }
                        setShelf={ setShelf }
                    />
                    <Shelf
                        name='movies'
                        library={ library }
                        setLibrary={ setLibrary }
                    />
                    
                    <NavTop />
                    <NavBottom />
                </div> }
                <HomeButton />
            </div>
        )
    }
    if (props.name === 'shows') {
        return (
            <div className='body'>

                { shelfForm && <ShelfForm
                    name='shows'
                    path='/addShow'
                    border='2px solid rgb(242, 129, 7)'
                    shelf={ shelf }
                    setShelf={ setShelf }
                    shelfForm={ shelfForm }
                    setShelfForm={ setShelfForm }
                /> }

                { shelf && <div>
                    <Sort   
                        border='242, 129, 7'
                        library={ library }
                        setLibrary={ setLibrary }
                        shelfForm={ shelfForm }
                        setShelfForm={ setShelfForm }
                        button='orange'
                        shelf={ shelf }
                        setShelf={ setShelf }
                    />
                    <Shelf
                        name='shows'
                        library={ library }
                        setLibrary={ setLibrary }
                    />
                    
                    <NavTop />
                    <NavBottom />
                </div> }
                <HomeButton />
            </div>
        )
    }
}

export default ShelfPage