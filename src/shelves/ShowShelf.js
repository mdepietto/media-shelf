import React from 'react'

const ShowShelf = (props) => {

    var toBeDeleted = 0

    const deleteShow = async () => {
        await fetch('/deleteShow', {
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
            <div>
                { props.showLib.map(show => {
                    return (
                        <div className='shelf' key={ show.id }>
                            <h3>{ props.showLib.indexOf(show) + 1 }:   { show.title }</h3>
                            <p>Author: { show.seasons }</p>
                            <p>Rating: { show.rating }</p>
                            <button
                                className='ui red inverted button tiny'
                                onClick={ () => {
                                    toBeDeleted = show.id
                                    confirmation(deleteShow)
                                    window.location.reload()
                                }}>
                            Delete</button>
                        </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default ShowShelf