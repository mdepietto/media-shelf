import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom'

// import ScreenSaver from './components/ScreenSaver'
import Profile from './auth/Profile'
import LogoutButton from './auth/LogoutButton';

// import NoContent from './components/NoContent'
// figure out how to not show nocontent when loading

const MainPage = () => {
    const [ bookCount, setBookCount ] = useState(0)
    const [ bookNoteCount, setBookNoteCount ] = useState(0)
    const [ movieCount, setMovieCount ] = useState(0)
    const [ movieNoteCount, setMovieNoteCount ] = useState(0)
    const [ showCount, setShowCount ] = useState(0)
    const [ showNoteCount, setShowNoteCount ] = useState(0)

    const userName = useAuth0().user

    const getCount = async (path, count) => {
        const newData = await fetch(path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ userName })
        })
        .then(res => res.json())
        count(newData.length)
    }
    getCount('/apiBooks', setBookCount)
    getCount('/apiBookNotes', setBookNoteCount)
    getCount('/apiMovies', setMovieCount)
    getCount('/apiMovieNotes', setMovieNoteCount)
    getCount('/apiShows', setShowCount)
    getCount('/apiShowNotes', setShowNoteCount)

    return (
        <div className='mainPage'>
            
            {/* <ScreenSaver /> */}
            
            <Profile
                bookCount={ bookCount }
                bookNoteCount={ bookNoteCount }
                movieCount={ movieCount }
                movieNoteCount={ movieNoteCount }
                showCount={ showCount }
                showNoteCount={ showNoteCount }
            />

            <div className='nav'>
                <Link to='/'>
                    <Button inverted color='pink' size='huge' className='navButton' style={{ margin: '0' }}>
                        Home
                    </Button>
                </Link>

                <br /><br />

                <Link to='books'>
                    <Button inverted size='huge' color='olive' animated='fade' className='navButton'>
                        <Button.Content visible>Books</Button.Content>
                        <Button.Content hidden>{ bookCount }</Button.Content>
                    </Button>
                </Link>
                <Link to='/bookNotes'>
                    <Button inverted size='huge' color='olive' animated='fade' className='navButton'>
                        <Button.Content visible>Book Notes</Button.Content>
                        <Button.Content hidden>{ bookNoteCount }</Button.Content>
                    </Button>
                </Link>

                <br /><br />

                <Link to='/movies'>
                    <Button inverted size='huge' color='yellow' animated='fade' className='navButton'>
                        <Button.Content visible>Movies</Button.Content>
                        <Button.Content hidden>{ movieCount }</Button.Content>
                    </Button>
                </Link>
                <Link to='/movieNotes'>
                    <Button inverted size='huge' color='yellow' animated='fade' className='navButton'>
                        <Button.Content visible>Movie Notes</Button.Content>
                        <Button.Content hidden>{ movieNoteCount }</Button.Content>
                    </Button>
                </Link>

                <br /><br />

                <Link to='/shows'>
                    <Button inverted size='huge' color='orange' animated='fade' className='navButton'>
                        <Button.Content visible>Shows</Button.Content>
                        <Button.Content hidden>{ showCount }</Button.Content>
                    </Button>
                </Link>
                <Link to='/showNotes'>
                    <Button inverted size='huge' color='orange' animated='fade' className='navButton'>
                        <Button.Content visible>Show Notes</Button.Content>
                        <Button.Content hidden>{ showNoteCount }</Button.Content>
                    </Button>
                </Link>

                <br /><br />
                
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Link to='/profile'>
                        <Button inverted size='big' color='teal'>
                            Profile
                        </Button>
                    </Link>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}

export default MainPage