import React from 'react'

const MovieShelf = (props) => {

    var toBeDeleted = 0

    const deleteMovie = async () => {
        await fetch('/deleteMovie', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ toBeDeleted })
        })
        .then(res => res.json())
    }

    const confirmation = (func) => {
        if (window.confirm('Are you sure?')) {
            return func()
        }
    }

    // creates component for each parameter of movie
    return (
        <div>
            <h1>Your Movie Library</h1>
                { props.lib.map(movie => {
                    return (
                        <div className='shelf' key={ movie.id }>
                            <h3>{ props.lib.indexOf(movie) + 1 }: { movie.title }</h3>
                            <p>Director: { movie.director }</p>
                            <p>Minutes: { movie.minutes }</p>
                            <p>Rating: { movie.rating }</p>
                            <button
                                className='ui red button tiny'
                                onClick={ () => {
                                    toBeDeleted = movie.id
                                    confirmation(deleteMovie)
                                    window.location.reload()
                                }}>
                            Delete</button>
                        </div>
                    )
                })}
        </div>
    )
}

export default MovieShelf