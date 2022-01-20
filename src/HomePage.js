import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom'

import ScreenSaver from './components/ScreenSaver'
import Profile from './auth/Profile'
import LogoutButton from './auth/LogoutButton';

const HomePage = () => {

    const [ profile, setProfile ] = useState(false)

    const [ bookCount, setBookCount ] = useState(0)
    const [ bookNoteCount, setBookNoteCount ] = useState(0)
    const [ movieCount, setMovieCount ] = useState(0)
    const [ movieNoteCount, setMovieNoteCount ] = useState(0)
    const [ showCount, setShowCount ] = useState(0)
    const [ showNoteCount, setShowNoteCount ] = useState(0)

    const userName = useAuth0().user

    const getCount = async (api, count) => {
        const newData = await fetch('/apiMedia', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ api, userName })
        })
        .then(res => res.json())
        count(newData.length)
    }
    getCount('Books', setBookCount)
    getCount('Book_Notes', setBookNoteCount)
    getCount('Movies', setMovieCount)
    getCount('Movie_Notes', setMovieNoteCount)
    getCount('Shows', setShowCount)
    getCount('Show_Notes', setShowNoteCount)

    const NavButton = (props) => {
        return (
            <Button inverted size='huge' color={ props.color } animated='fade' className='navButton'>
                <Button.Content visible>{ props.visible }</Button.Content>
                <Button.Content hidden>{ props.hidden }</Button.Content>
            </Button>
        )
    }

    return (
        <div className='mainPage'>
            
            { profile && <Profile
                bookCount={ bookCount }
                bookNoteCount={ bookNoteCount }
                movieCount={ movieCount }
                movieNoteCount={ movieNoteCount }
                showCount={ showCount }
                showNoteCount={ showNoteCount }
            /> }

            { !profile && <ScreenSaver /> }

            <div className='nav'>
                <Button inverted size='big' color='teal' onClick={() => setProfile(!profile)}>
                    Profile
                </Button>
                <br /><br />
                <Link to='/books'><NavButton color='olive' visible='Books' hidden={ bookCount } /></Link>
                <Link to='/bookNotes'><NavButton color='olive' visible='Book Notes' hidden={ bookNoteCount } /></Link>
                <br /><br />
                <Link to='/movies'><NavButton color='yellow' visible='Movies' hidden={ movieCount } /></Link>
                <Link to='/movieNotes'><NavButton color='yellow' visible='Movie Notes' hidden={ movieNoteCount } /></Link>
                <br /><br />
                <Link to='/shows'><NavButton color='orange' visible='Shows' hidden={ showCount } /></Link>
                <Link to='/showNotes'><NavButton color='orange' visible='Show Notes' hidden={ showNoteCount } /></Link>
                <br /><br />
                <LogoutButton />
            </div>
        </div>
    )
}

export default HomePage