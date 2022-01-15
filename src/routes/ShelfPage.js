import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'

import HomeButton from '../components/HomeButton'
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
                { shelfForm && <ShelfForm name='books' path='/addBook' border='2px solid rgb(202, 237, 114)' /> }

                <div>
                    <Sort border='202, 237, 114' library={ library } setLibrary={ setLibrary } />
                    <Button
                        icon
                        circular
                        size='massive'
                        color='olive'
                        onClick={ () => setShelfForm(!shelfForm) }
                    >
                        <Icon name='plus' />
                    </Button>
                </div>
                <Shelf name='books' library={ library } setLibrary={ setLibrary } />
                <HomeButton />
                <NavTop />
                <NavBottom />
            </div>
        )
    }
    if (props.name === 'movies') {
        return (
            <div className='body'>

                { shelfForm && <ShelfForm name='movies' path='/addMovie' border='2px solid rgb(235, 229, 52)' /> }

                <div>
                    <Sort border='235, 229, 52' library={ library } setLibrary={ setLibrary } />
                    <Button
                        icon
                        circular
                        size='massive'
                        color='yellow'
                        onClick={ () => setShelfForm(!shelfForm) }
                    >
                        <Icon name='plus' />
                    </Button>
                </div>
                <Shelf name='movies' library={ library } setLibrary={ setLibrary } />
                <HomeButton />
                <NavTop />
                <NavBottom />
            </div>
        )
    }
    if (props.name === 'shows') {
        return (
            <div className='body'>

                { shelfForm && <ShelfForm name='shows' path='/addShow' border='2px solid rgb(242, 129, 7)' /> }

                <div>
                    <Sort border='242, 129, 7' library={ library } setLibrary={ setLibrary } />
                    <Button
                            icon
                            circular
                            size='massive'
                            color='orange'
                            onClick={ () => setShelfForm(!shelfForm) }
                        >
                        <Icon name='plus' />
                    </Button>
                </div>
                <Shelf name='shows' library={ library } setLibrary={ setLibrary } />
                <HomeButton />
                <NavTop />
                <NavBottom />
            </div>
        )
    }
}

export default ShelfPage