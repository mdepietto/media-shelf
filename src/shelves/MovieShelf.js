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

    return (
        <div>
            { props.movieLib.map(movie => {
                return (
                    <div className='shelf' key={ movie.id }>
                        <h1 className='mtitles'>{ props.movieLib.indexOf(movie) + 1 }:   { movie.title }</h1>
                        <p>Director: { movie.director }</p>
                        <p>Minutes: { movie.minutes }</p>
                        <p>Rating: { movie.rating }</p>
                        <button
                            className='ui red inverted button tiny'
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