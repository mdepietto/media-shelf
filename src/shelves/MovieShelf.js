import React, { useState } from 'react'
import { api } from '../serverCalls/movieCalls'

const MovieShelf = () => {
    const [ mov, setMov ] = useState([])
    const [ shelf, setShelf ] = useState(false)
    const [ count, setCount ] = useState(0)
    var toBeDeleted = ''
    
    var getShelf = async () => {
        if (!mov[0]) {
            const newData = await api()
            newData.map(m => {
                return setMov(prev => [ ...prev, m ])
            })
        }
        const newData = await api()
        setCount(newData.length)
    }
    getShelf()

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
    const mShelf = () => {
        return (
            mov.map(movie => {
                return (
                    <div className='shelf' key={ movie.id }>
                        <h3>{ mov.indexOf(movie) + 1 }: { movie.title }</h3>
                        <p>Director: { movie.director }</p>
                        <p>Minutes: { movie.minutes }</p>
                        <p>Rating: { movie.rating }</p>
                        <button
                            className='ui red button tiny'
                            onClick={ () => {
                                toBeDeleted = movie.title
                                confirmation(deleteMovie)
                                setShelf(!shelf)
                            }}>
                        Delete</button>
                    </div>
                )
            })
        )
    }

    return (
        <div>
            <button className="ui olive fade animated button" onClick={ () => setShelf(!shelf) }>
                <div className='visible content'>Open Movies</div>
                <div className='hidden content'>{ count }</div>
            </button>
            { shelf && mShelf() }
        </div>
    )
}

export default MovieShelf