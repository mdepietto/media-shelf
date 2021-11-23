import React from 'react'
import { Button } from 'semantic-ui-react'

const Shelf = (props) => {

    var toBeDeleted = 0

    const deleteMedia = async () => {
        await fetch(props.path, {
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

    const DeleteButton = (props) => {
        return (
            <Button
                inverted color='red'
                size='large'
                onClick={ () => {
                    toBeDeleted = props.media.id
                    confirmation(deleteMedia)
                    props.setShelf(false)
                    props.setLib([])
            }}>
            Delete</Button>
        )
    }

    if (props.name === 'book') {
        return (
            <div>
                { props.lib.map(book => {
                    return (
                        <div className='shelf' key={ book.id } style={{ border: '2px solid rgb(202, 237, 114)' }}>
                            <h3 className='shelfTitles'>{ props.lib.indexOf(book) + 1 }:   { book.title }</h3>
                            <p style={{ margin: '.5rem' }}><i>Author:</i> { book.author }</p>
                            <p style={{ margin: '.5rem' }}><i>Pages:</i> { book.pages }</p>
                            <p style={{ margin: '.5rem' }}><i>Rating:</i> { book.rating }</p>
                            <br />
                            <DeleteButton media={ book } setShelf={ props.setShelf } setLib={ props.setLib } />
                        </div>
                    )
                })}
            </div>
        )
    }

    if (props.name === 'movie') {
        return (
            <div>
                { props.lib.map(movie => {
                    return (
                        <div className='shelf' key={ movie.id } style={{ border: '2px solid rgb(235, 229, 52)' }}>
                            <h1 className='shelfTitles'>{ props.lib.indexOf(movie) + 1 }:   { movie.title }</h1>
                            <p style={{ margin: '.5rem' }}><i>Director:</i> { movie.director }</p>
                            <p style={{ margin: '.5rem' }}><i>Minutes:</i> { movie.minutes }</p>
                            <p style={{ margin: '.5rem' }}><i>Rating:</i> { movie.rating }</p>
                            <br />
                            <DeleteButton media={ movie } setShelf={ props.setShelf } setLib={ props.setLib } />
                        </div>
                    )
                })}
            </div>
        )
    }

    if (props.name === 'show') {
        return (
            <div>
                { props.lib.map(show => {
                    return (
                        <div className='shelf' key={ show.id } style={{ border: '2px solid rgb(242, 129, 7)' }}>
                            <h3 className='shelfTitles'>{ props.lib.indexOf(show) + 1 }:   { show.title }</h3>
                            <p style={{ margin: '.5rem' }}><i>Seasons:</i> { show.seasons }</p>
                            <p style={{ margin: '.5rem' }}><i>Rating:</i> { show.rating }</p>
                            <br />
                            <DeleteButton media={ show } setShelf={ props.setShelf } setLib={ props.setLib } />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Shelf