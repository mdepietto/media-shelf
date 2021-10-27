import React, { useState } from 'react'

function TestShelf() {

    var [ mov, setMov ] = useState([])
    
    // fetching table array of objects
    var api = async () => await fetch('/api', { method: 'GET' }).then(res => res.json())

    // mapping through each object & adding title of each to state
    const getShelf = async () => {
        var newData = await api()
        newData.map(m => {
            return setMov(prev => [ ...prev, m ])
        })
    }

    // creates component for each type of media
    const testComponent = () => {
        return (
            mov.map(movie => {
                return (
                    <div key={ movie.id }>
                        <h1>{ movie.title }</h1>
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
            <button onClick={ getShelf }>Reveal Movies</button>
            { testComponent() }
        </div>
    )
}

export default TestShelf