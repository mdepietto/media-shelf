import React from 'react'
import { Button } from 'semantic-ui-react'

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
                    <div className='shelf' key={ movie.id } style={{ border: '2px solid rgb(235, 229, 52)' }}>
                        <h1 className='shelfTitles'>{ props.movieLib.indexOf(movie) + 1 }:   { movie.title }</h1>
                        <p style={{ margin: '.5rem' }}><i>Director:</i> { movie.director }</p>
                        <p style={{ margin: '.5rem' }}><i>Minutes:</i> { movie.minutes }</p>
                        <p style={{ margin: '.5rem' }}><i>Rating:</i> { movie.rating }</p>
                        <br />
                        <Button
                            inverted color='red'
                            size='large'
                            onClick={ () => {
                                toBeDeleted = movie.id
                                confirmation(deleteMovie)
                                window.location.reload()
                            }}>
                        Delete</Button>
                    </div>
                )
            })}
        </div>
    )
}

export default MovieShelf