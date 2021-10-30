import React, { useState } from 'react'
import { api } from '../serverCalls/movieCalls'

const MovieShelf = () => {
    const [ mov, setMov ] = useState([])
    const [ shelf, setShelf ] = useState(false)
    const [ count, setCount ] = useState(0)
    
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

    // creates component for each parameter of movie
    const mShelf = () => {
        return (
            mov.map(movie => {
                return (
                    <div key={ movie.id }>
                        <h3>{ movie.id }: { movie.title }</h3>
                        <p>Director: { movie.director }</p>
                        <p>Minutes: { movie.minutes }</p>
                        <p>Rating: { movie.rating }</p>
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