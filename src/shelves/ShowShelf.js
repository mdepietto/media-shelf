import React from 'react'
import { Button } from 'semantic-ui-react'

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
            { props.showLib.map(show => {
                return (
                    <div className='shelf' key={ show.id } style={{ border: '2px solid rgb(242, 129, 7)' }}>
                        <h3 className='shelfTitles'>{ props.showLib.indexOf(show) + 1 }:   { show.title }</h3>
                        <p style={{ margin: '.5rem' }}><i>Seasons:</i> { show.seasons }</p>
                        <p style={{ margin: '.5rem' }}><i>Rating:</i> { show.rating }</p>
                        <br />
                        <Button
                            inverted color='red'
                            size='large'
                            onClick={ () => {
                                toBeDeleted = show.id
                                confirmation(deleteShow)
                                props.setShowShelf(false)
                                props.setShowLib([])
                            }}>
                        Delete</Button>
                    </div>
                )
            })}
        </div>
    )
}

export default ShowShelf