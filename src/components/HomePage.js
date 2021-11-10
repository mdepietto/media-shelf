import React, { useState } from 'react'

import Nav from './Nav'

// import MovieShelf from '../shelves/MovieShelf'
// import MovieNoteShelf from '../shelves/MovieNoteShelf'
// import MovieNote from '../notes/MovieNote'
import MovieForm from '../forms/MovieForm'

// import BookNote from '../notes/BookNote'
// import ShowNote from '../notes/ShowNote'

// import BookForm from '../forms/BookForm'
// import ShowForm from '../forms/ShowForm'

// import LoginButton from './LoginButton'
// import LogoutButton from './LogoutButton'
// import Profile from './Profile'

function HomePage() {

    // const [ bookShelf, setBookShelf ] = useState(false)
    // const [ showShelf, setShowShelf ] = useState(false)
    // const [ movieShelf, setMovieShelf ] = useState(false)
    return (
        <div id='homePage'>
            <Nav />
            {/* <div id='auth'>
                <LoginButton />
                <LogoutButton />
                <Profile />
            </div> */}

            {/* <div id='bookShelf'>
                <button className="ui primary button huge" onClick={() => setBookShelf(!bookShelf)}>Book Shelf</button>
                { bookShelf && <BookForm /> }
                { bookShelf && <BookNote /> }
            </div>

            <div id='showShelf'>
                <button className="ui primary button huge" onClick={() => setShowShelf(!showShelf)}>Show Shelf</button>
                { showShelf && <ShowForm /> }
                { showShelf && <ShowNote /> }
            </div> */}

            {/* <div id='movieShelf'>
                <button className="ui primary button huge" onClick={() => setMovieShelf(!movieShelf)}>Movie Shelf</button>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    { movieShelf && <MovieShelf /> }
                    { movieShelf && <MovieForm /> }
                </div>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    { movieShelf && <MovieNoteShelf /> }
                    { movieShelf && <MovieNote /> }
                </div>
            </div> */}
        </div>
    )
    
}

export default HomePage